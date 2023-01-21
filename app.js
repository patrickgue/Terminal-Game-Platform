
initterm(80,25);


const methods = {
    print: {
        call: (arguments,scope) => {
            console.log(parseArguments(arguments,scope));
            puts(parseArguments(arguments,scope).replaceAll('\\n', '\n'));
        }
    }
};



fetch("programs/world.lua").then(r => r.text()).then(codeText => {

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
        print(text, rt_text)
        coroutine.resume(co)
    end)

    coroutine.yield()
    return rt_text
end

function color_on(color)
    js.global:color_on(color)
end

function color_off()
    js.global:color_off()
end

function inverse_on()
    js.global:inverse_on()
end

function inverse_off()
    js.global:inverse_off()
end

COLOR_BLACK='#272C2B'
COLOR_WHITE='#EEEEEE';
COLOR_RED='#FF0000';
COLOR_BLUE='#1471AA';
COLOR_GREEN='#06B46B';

coroutine.wrap(function ()
    ${codeText}
end)()

`
    // console.log(code)
    const state = new Lua.State();
    state.execute(code);
    
});

