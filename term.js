let term = null, width, height, _html = '', _inverse = false;

const COLOR_BLACK='#272C2B'
const COLOR_WHITE='#EEEEEE';
const COLOR_RED='#FF0000';
const COLOR_BLUE='#1471AA';
const COLOR_GREEN='#06B46B';

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