let term = null, width, height, _html = '', _inverse = false;

const COLOR_BLACK='#272C2B'
const COLOR_WHITE='#EEEEEE';
const COLOR_RED='#FF0000';
const COLOR_BLUE='#1471AA';
const COLOR_GREEN='#06B46B';

let buffer = '';
let echo = false;
let res;
let current_color = null;

let putc_stack = [];

const CMD_CHAR = 0
const CMD_COLOR_ON = 1
const CMD_COLOR_OFF = 2

function initterm(w,h)
{
    term = document.querySelector('.crt pre');
    width = w;
    height = h;
    _render();
}

function _render()
{
    if (!term)
        throw new Error("no CRT found");

    term.innerHTML = _html + '<span class="cursor"> </span>';
}

function putc(c)
{
    putc_stack.push([CMD_CHAR, c]);
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
    putc_stack = [];
    _html = '';
    _render();
}

const input = document.querySelector("#input");

document.body.addEventListener('click', () => input.focus());
input.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e);
    if (e.key === 'Enter')
    {
        if (res)
            res(buffer);
        echo = false;
    }

    if (echo)
    {

        if (e.key.length === 1)
        {
            putc(e.key);
            buffer += e.key;
        }
        else if (e.keyCode === 10 || e.keyCode === 13)
            putc('\n');

    }
});

setInterval(() => {
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
}, 30)