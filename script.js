const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
let buttonCounterElement = document.getElementById('buttonCounter');
let totalButtonCount = 10;
let currentButtonCount = 0;
const buttonMaxDelay = 30000;
const buttonMinDelay = 10000;
const secondsMultiplier = 10000;
const buttonTimer = 8;

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
        console.log(currentButtonCount);
        currentButtonCount++;
        clearInterval(timer);
        clearExistingButtonAndTimer(buttonContainer);
        scheduleNextButton(currentButtonCount);
        updateButtonCounter();
    });
}

function clearExistingButtonAndTimer(buttonContainer) {
    const existingButton = buttonContainer.querySelector('.dynamicButton');
    if (existingButton) buttonContainer.removeChild(existingButton);
}

function createButton() {
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
    const delay = Math.random() * (buttonMaxDelay - buttonMinDelay) + secondsMultiplier;
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
            resetBackground();
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
    buttonCounterElement.innerText = `Buttons remaining: ${currentButtonCount}/${totalButtonCount}`;
}

function resetBackground() {
    document.body.style.backgroundColor = "#333";
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
    enableFinished();
    disableButtonCounterAnimation();
}

function looseGame() {
    enableFailed();
    clearExistingButtonAndTimer(buttonContainer);
    document.body.style.backgroundColor = "#53202d";
    startCooldown();
    buttonCounterElement.style.display = 'none';
}
