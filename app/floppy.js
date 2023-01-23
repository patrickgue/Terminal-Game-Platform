const floppies = [
    {
        title: 'Battleships',
        prog: 'battleships',
        color: '#d13115'
    },
    /* {
        title: 'hello',
        prog: 'hello',
        color: '#05628d'
    }, */
    {
        title: 'SysV Sim',
        prog: 'world',
        color: '#0ca35d'
    },
    {
        title: 'graphics',
        prog: 'graphics_test',
        color: '#05628d'
    }
];

const floppies_a = [];

const wrapper = document.querySelector(".floppies");
for (const floppy of floppies) {
    const div = document.createElement("div");
    div.classList.add("floppy");

    div.innerHTML = `<div class="floppy-label">
                        <div class="floppy-label-head" style="background-color: ${floppy.color}"></div>
                        <span>${floppy.title}</span>
                    </div>
                    <div class="floppy-hole"></div>
                    <div class="floppy-opening"></div>`;
    wrapper.appendChild(div);
    div.addEventListener('click', () => {
        startProgram(floppy.prog);
    })
}