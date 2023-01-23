let term = null, width, height, _html = '', _inverse = false, _char_grid;

const COLOR_BLACK='#272C2B'
const COLOR_WHITE='#EEEEEE';
const COLOR_RED='#FF0000';
const COLOR_BLUE='#1471AA';
const COLOR_GREEN='#06B46B';

let buffer = '';
let echo = false;
let res;
let current_color = null;
let baud = 1000;

let putc_stack = [];

const CMD_CHAR = 0
const CMD_COLOR_ON = 1
const CMD_COLOR_OFF = 2


const TERM_MODE_SERIAL = 0;
const TERM_MODE_GRAPH = 1;


function initterm(w,h)
{
    term = document.querySelector('.crt pre');
    mode = TERM_MODE_SERIAL;
    width = w;
    height = h;
    _render();
}

function init_graphics_mode()
{
    mode = TERM_MODE_GRAPH;
    clear();
}

function _render()
{
    if (!term)
        throw new Error("no CRT found");

    if (mode === TERM_MODE_SERIAL)
    {
        term.innerHTML = _html + buffer + '<span class="cursor"> </span>';
    }
    else
    {
        console.log('render?')
        for (j = 0; j < height; j++)
        {
            for (i = 0; i < width; i++)
            {
                const ch = _char_grid[j][i];

                _html +=  `<span style="background-color: ${ch.b}; color: ${ch.f}">${ch.c}</span>`;
            }
            _html += '\n';
        }
        term.innerHTML = _html;
    }
    
}

function putc(c)
{
    putc_stack.push([CMD_CHAR, c]);
}


function mvputc(x, y, c, f, b)
{
    _char_grid[x][y] = {c: c, f: f, b: b};
}

function putc_impl(c)
{
    if (!term)
        throw new Error("no CRT found");

    if (c.length > 1)
        c = c.charAt(0);
    
    let lines = _html.split('\n');
    if (lines[lines.length - 1].length >= width)
    {
        _html += '\n';
    }

    _html += c;

    lines = _html.split('\n');
    if (lines.length > height)
    {
        lines.splice(0,1);
        _html = lines.join('\n');
    }

    _render();
}



function puts(s)
{
    let i;

    for (i = 0; i < s.length; i++)
    {
        putc(s.charAt(i));
    }
}

function color_on_impl(fg, bg)
{
    _html += '<span style="background-color: ' + bg + '; color: ' + fg + ';">'
}

function color_on(fg, bg)
{
    if (current_color)
    {
        color_off();
    }

    current_color = true;

    putc_stack.push([CMD_COLOR_ON, fg, bg]);
}

function color_off()
{
    if (current_color)
    {
        putc_stack.push([CMD_COLOR_OFF])
    }
}


function color_off_impl()
{
    if (!term)
        throw new Error("no CRT found");

    _html += '</span>';

    _render();
}

function gets(callback)
{
    buffer = '';
    echo = true;


    return new Promise(resolve => {
        res = resolve;
    })
}

function clear()
{
    if (mode === TERM_MODE_GRAPH)
    {
        putc_stack = [];
        _html = '';    
    }
    else
    {
        _char_grid = [];
        for (j = 0; j < height; j++)
        {
            _char_grid[j] = [];
            for (i = 0; i < width; i++)
            {
                _char_grid[j][i] = {c: ' ', f: COLOR_WHITE, b: COLOR_BLACK};
            }
        }
    }
    _render();
}

const input = document.querySelector("#input");

document.querySelector('#wrapper').addEventListener('click', () => input.focus());
input.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e);
    if (e.keyCode === 10 || e.keyCode === 13)
    {
        if (res)
            res(buffer);
        echo = false;
        puts(buffer)
    }
    else if (e.keyCode === 8)
    {
        buffer = buffer.substring(0, buffer.length - 1);
        console.log(buffer);
    }

    if (echo)
    {

        if (e.key.length === 1)
        {
            buffer += e.key;
        }
        else if (e.keyCode === 10 || e.keyCode === 13)
            buffer += '\n';

        _render();
    }
});

setInterval(() => {
    if (mode === TERM_MODE_SERIAL)
    {
        if (putc_stack.length > 0)
        {
            const [cmd, val1, val2] = putc_stack.shift();
    
            switch(cmd)
            {
                case CMD_CHAR:
                    putc_impl(val1);
                    break;
                case CMD_COLOR_ON:
                    color_on_impl(val1, val2);
                    break;
                case CMD_COLOR_OFF:
                    color_off_impl();
                    break;
            }
    
        }
    
    }
}, 1000 / (baud / 8));