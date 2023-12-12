const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
let buttonCounterElement = document.getElementById('buttonCounter');
let totalButtonCount = 10;
let currentButtonCount = 0;
const buttonMaxDelay = 30000;
const buttonMinDelay = 10000;
const secondsMultiplier = 10000;
const buttonTimer = 5;

function startGame() {
    this.disabled = true;
    this.style.display = 'none';
    spawnButton(currentButtonCount);
    startButtonCounter();
}

function spawnButton(buttonCount) {
    if (buttonCount >= totalButtonCount) {
        winGame();
        return;
    }
    const buttonContainer = document.getElementById('buttonContainer');
    clearExistingButtonAndTimer(buttonContainer);

    const button = createButton();
    buttonContainer.appendChild(button);
    positionTimerDisplay(button);

    let timeLeft = buttonTimer;
    const timer = setInterval(() => {
        timeLeft--;
        button.innerText = `${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (button.parentElement) {
                looseGame();
            }
        }
    }, 1000);

    button.addEventListener('click', function() {
        currentButtonCount++;
        clearInterval(timer);
        clearExistingButtonAndTimer(buttonContainer);
        scheduleNextButton(currentButtonCount);
        updateButtonCounter();
        enableWaiting();
    });
}

function clearExistingButtonAndTimer(buttonContainer) {
    const existingButton = buttonContainer.querySelector('.dynamicButton');
    if (existingButton) buttonContainer.removeChild(existingButton);
}

function createButton() {
    disableWaiting();
    const button = document.createElement('button');
    button.classList.add('dynamicButton');
    button.classList.add('font-style')
    button.innerText = buttonTimer;
    return button;
}

function positionTimerDisplay(button) {
    const buttonContainer = document.getElementById('buttonContainer');
    const maxButtonWidth = 100;
    const maxButtonHeight = 40;
    const maxX = buttonContainer.offsetWidth - maxButtonWidth;
    const maxY = buttonContainer.offsetHeight - maxButtonHeight;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

function scheduleNextButton(buttonCount) {
    let delay = Math.random() * (buttonMaxDelay- buttonMinDelay) + secondsMultiplier;
    delay = Math.floor(delay);
    setTimeout(() => {
        spawnButton(buttonCount);
    }, delay);
}

function startCooldown() {
    startButton.disabled = true;
    let cooldownTime = 30;
    startButton.innerText = `Cooldown: ${cooldownTime} s`;
    startButton.style.display = 'block';

    const cooldownTimer = setInterval(() => {
        cooldownTime--;
        startButton.innerText = `Cooldown: ${cooldownTime} s`;
        if (cooldownTime <= 0) {
            clearInterval(cooldownTimer);
            enableStartButton();
            disableFailed();
        }
    }, 1000);
}

function startButtonCounter() {
    updateButtonCounter();
    buttonCounterElement.style.display = 'block';
}

function updateButtonCounter() {
    buttonCounterElement.innerText = `Sequence in progress... ${currentButtonCount}/${totalButtonCount}`;
}

function enableStartButton() {
    startButton.disabled = false;
    startButton.innerText = 'Start';
}

function enableFailed() {
    let elemet = document.getElementById('failed');
    elemet.style.display = 'block';
}

function disableFailed() {
    let elemet = document.getElementById('failed');
    elemet.style.display = 'none';
}

function enableFinished() {
    let elemet = document.getElementById('finished');
    elemet.style.display = 'block';
}

function disableButtonCounterAnimation() {
    buttonCounterElement.style.animation = 'none';
}

function winGame() {
    document.body.style.backgroundColor = "green";
    disableWaiting();
    enableFinished();
    disableButtonCounterAnimation();
}

function looseGame() {
    disableWaiting();
    enableFailed();
    clearExistingButtonAndTimer(buttonContainer);
    document.body.style.backgroundColor = "#53202d";
    startCooldown();
    buttonCounterElement.style.display = 'none';
}

function enableWaiting(){
    document.getElementById("waiting").style.display = 'block';
}

function disableWaiting(){
    document.getElementById("waiting").style.display = 'none';
}

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

setInterval(createCodeLine, 150);