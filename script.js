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
    this.disabled = true; // Disable the start button
    this.style.display = 'none';
    spawnButton(currentButtonCount); // Start the first button immediately
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
    positionTimerDisplay(button); // Position the button

    let timeLeft = buttonTimer; // 8 seconds countdown
    const timer = setInterval(() => {
        timeLeft--;
        button.innerText = `${timeLeft}`; // Update button text with countdown
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
    button.innerText = buttonTimer; // Initial text with countdown
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
    let cooldownTime = 30; // 30 seconds cooldown
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
    updateButtonCounter(); // Update the display immediately
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
    startButton.innerText = 'Start'; // Reset the text on the button
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
    startCooldown(); // Start the 30-second cooldown
    buttonCounterElement.style.display = 'none';
}
