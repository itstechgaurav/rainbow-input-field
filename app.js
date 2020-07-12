let isActive = false;
const colors = [ '#972FFE', '#FF6B2A', '#6FCA2B', '#37A6D4', '#FF2F29'];
let colorIndex = 0;

let SetInterval = null;

const root = document.documentElement;
const input = document.getElementById("input");
const textbox = document.getElementById("input-text");
const body = document.querySelector('body');
const placeholder = document.querySelector('.placeholder');


// Typing



input.addEventListener('click', _ => {
    input.classList.add('active');
    isActive = true;
    window.requestAnimationFrame(_ => {
        SetInterval = setInterval(_ => {
            updateColor();
        }, 1000);
    })
});

body.addEventListener('click', _ => {
    if(_.target == body) {
        isActive = false;
        input.classList.remove('active');
        if(SetInterval) clearInterval(SetInterval);
    }
})

body.addEventListener('keypress', typing);
body.addEventListener('keydown', _ => {
    if(_.key == 'Backspace') typing(_, true);
})

function typing(ev, isBackSpace = false) {
    if(!isBackSpace) {
        updateColor();
        if(!isActive) return false;
        const EL = document.createElement('span');
        EL.classList.add(ev.key == ' ' ? 'space' : 'letter');
        EL.setAttribute('data-index', colorIndex);
        EL.style.color = getColor();
        EL.innerHTML = ev.key == ' ' ? '&nbsp;' : ev.key;
        textbox.appendChild(EL);
        placeholder.style.display = 'none';
    } else {
        if(!textbox.childNodes.length) {
            placeholder.style.display = 'inline-block';
            return false;
        }
        const lastChild = textbox.childNodes[textbox.childNodes.length - 1];
        colorIndex = parseInt(lastChild.getAttribute('data-index'));
        updateCssVar(lastChild.style.color);
        textbox.removeChild(lastChild);

        if(!textbox.childNodes.length) placeholder.style.display = 'inline-block';
    }
}


function getColor() {
    let color = colors[colorIndex];
    return color;
}

function updateColor() {
    colorIndex++;
    if(colorIndex == colors.length) colorIndex = 0;
    updateCssVar(getColor());
}

function updateCssVar(color) {
    root.style.setProperty('--main-color', color);
}