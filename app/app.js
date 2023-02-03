

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
    
    
    Promise.all([
        fetch("programs/" + name + ".lua").then(r => r.text()),
        fetch("app/wrapper.lua").then(r => r.text())
    ])
    .then(([codeText, wrapperCode]) => {
        const code = `
    
        ${wrapperCode}

coroutine.wrap(function ()
    ${codeText}
end)()
    
    `;
        const state = new Lua.State();
        state.execute(code);
    });
    
    
}
