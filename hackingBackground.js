function generateRandomCode() {
    let characters = '01';
    let codeLength = 100;
    let randomCode = '';

    for (let i = 0; i < codeLength; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomCode;
}

function createCodeLine() {
    let codeLine = document.createElement('div');
    codeLine.textContent = generateRandomCode();
    codeLine.style.position = 'absolute';
    codeLine.style.whiteSpace = 'nowrap';
    codeLine.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    codeLine.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    codeLine.style.opacity = Math.random();

    document.getElementById('hackingBackground').appendChild(codeLine);

    setTimeout(() => {
        document.getElementById('hackingBackground').removeChild(codeLine);
    }, 3000);
}