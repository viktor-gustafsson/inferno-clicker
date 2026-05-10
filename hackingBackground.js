function generateRandomCode() {
    let characters = '0123456789';
    let codeLength = 30 + Math.floor(Math.random() * 120);
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
    codeLine.style.left = `${Math.floor(Math.random() * window.innerWidth * 2 - window.innerWidth)}px`;
    codeLine.style.opacity = 0.1 + Math.random() * 0.4;
    codeLine.style.fontSize = `${10 + Math.floor(Math.random() * 12)}px`;
    codeLine.style.letterSpacing = `${Math.floor(Math.random() * 4)}px`;
    codeLine.style.color = `hsl(${110 + Math.floor(Math.random() * 30)}, ${50 + Math.floor(Math.random() * 30)}%, ${20 + Math.floor(Math.random() * 20)}%)`;
    codeLine.style.textShadow = '0 0 3px rgba(0, 255, 80, 0.2)';

    document.getElementById('hackingBackground').appendChild(codeLine);

    setTimeout(() => {
        document.getElementById('hackingBackground').removeChild(codeLine);
    }, 3000);
}