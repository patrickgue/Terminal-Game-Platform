let term = null, width, height, _html = '', _inverse = false;

const COLOR_BLACK='#272C2B'
const COLOR_WHITE='#EEEEEE';
const COLOR_RED='#FF0000';
const COLOR_BLUE='#1471AA';
const COLOR_GREEN='#06B46B';

let buffer = '';
let echo = false;
let res;

let putc_stack = [];

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
    putc_stack.push(c);
}

function putc_actual(c)
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

setInterval(() => {
    if (putc_stack.length > 0)
    {
        putc_stack.reverse();
        putc_actual(putc_stack.pop());
        putc_stack.reverse();
    }
}, 30)

function puts(s)
{
    let i;

    for (i = 0; i < s.length; i++)
    {
        putc(s.charAt(i));
    }
}

function color_on(c)
{
    if (_inverse) {
        _html += '<span style="background-color: '+c+'">'
    } else {
        _html += '<span style="color: '+c+'">';
    }
    _render();
}

function inverse_toggle()
{
    _inverse = !_inverse;
}

function inverse_on()
{
    _inverse = true;
}

function inverse_off()
{
    _inverse = false;
}

function color_off()
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

const input = document.querySelector("#input");

document.body.addEventListener('click', () => input.focus());
input.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e);
    if (e.key === 'Enter')
    {
        // puts("ENTER\n");
        console.log(buffer);
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