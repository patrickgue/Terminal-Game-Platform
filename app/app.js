

initterm(80,25);

puts("\n    Insert Floppy...")

function startProgram(name) {

    clear();


    const methods = {
        print: {
            call: (arguments,scope) => {
                console.log(parseArguments(arguments,scope));
                puts(parseArguments(arguments,scope).replaceAll('\\n', '\n'));
            }
        }
    };
    
    
    
    fetch("programs/" + name + ".lua").then(r => r.text()).then(codeText => {
    
        const code = `
    
function puts(str)
    js.global:puts(str)
end

function gets()
    local rt_text
    local co = coroutine.running()
    promise = js.global:gets();
    promise['then'](promise, function(_, text)
        rt_text = text
        coroutine.resume(co)
    end)

    coroutine.yield()
    return rt_text
end

function sleep(millis)
    local co = coroutine.running()
    js.global:setTimeout(function ()
        coroutine.resume(co)
    end, millis)

    coroutine.yield()
end

function color_on(fg, bg)
    js.global:color_on(fg, bg)
end

function color_off()
    js.global:color_off()
end

function clear()
    js.global:clear()
end

function mvputc(x,y,c,f,b)
    js.global:mvputc(x,y,c,f,b)
end

function graphics_mode()
    js.global:init_graphics_mode()
end

function buffer_flush()
    js.global:_render()
end


COLOR_BLACK='#272C2B'
COLOR_WHITE='#EEEEEE';
COLOR_RED='#FF0000';
COLOR_BLUE='#1471AA';
COLOR_GREEN='#06B46B';

TERM_MODE_SERIAL = 0
TERM_MODE_GRAPH = 1

coroutine.wrap(function ()
    ${codeText}
end)()
    
    `;
        const state = new Lua.State();
        state.execute(code);
    });
    
    
}
