const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);
let totalTimeRemaining = 300; // Total time in seconds

function startGame() {
    this.disabled = true; // Disable the start button
    this.style.display = 'none';
    spawnButton(0); // Start the first button immediately
    startTotalTimeCounter();
}

function spawnButton(buttonCount) {
    if (buttonCount >= 10) {
        document.body.style.backgroundColor = "green";
        return;
    }

    const buttonContainer = document.getElementById('buttonContainer');
    clearExistingButtonAndTimer(buttonContainer);

    const button = createButton();
    buttonContainer.appendChild(button);
    positionTimerDisplay(button); // Position the button

    let timeLeft = 8; // 8 seconds countdown
    const timer = setInterval(() => {
        timeLeft--;
        button.innerText = `${timeLeft}`; // Update button text with countdown
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (button.parentElement) {
                clearExistingButtonAndTimer(buttonContainer);
                document.body.style.backgroundColor = "red";
                document.getElementById('totalTimeCounter').style.display = 'none';
                totalTimeRemaining = 300;
                startCooldown(); // Start the 30-second cooldown
            }
        }
    }, 1000);

    button.addEventListener('click', function() {
        clearInterval(timer);
        clearExistingButtonAndTimer(buttonContainer);
        scheduleNextButton(buttonCount + 1);
    });
}

function clearExistingButtonAndTimer(buttonContainer) {
    const existingButton = buttonContainer.querySelector('.dynamicButton');
    if (existingButton) buttonContainer.removeChild(existingButton);
}

function createButton() {
    const button = document.createElement('button');
    button.classList.add('dynamicButton');
    button.innerText = '8'; // Initial text with countdown
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
    const delay = Math.random() * (30000 - 10000) + 10000;
    setTimeout(() => {
        spawnButton(buttonCount);
    }, delay);
}

function startCooldown() {
    startButton.disabled = true;
    let cooldownTime = 30; // 30 seconds cooldown
    startButton.innerText = `Cooldown: ${cooldownTime}s`;
    startButton.style.display = 'block';

    const cooldownTimer = setInterval(() => {
        cooldownTime--;
        startButton.innerText = `Cooldown: ${cooldownTime}s`;
        if (cooldownTime <= 0) {
            clearInterval(cooldownTimer);
            resetBackground();
            enableStartButton();
        }
    }, 1000);
}

function startTotalTimeCounter() {
    updateTotalTimeCounter(); // Update the display immediately
    document.getElementById('totalTimeCounter').style.display = 'block';
    const totalTimeCounterInterval = setInterval(() => {
        totalTimeRemaining--;
        updateTotalTimeCounter();

        if (totalTimeRemaining <= 0) {
            clearInterval(totalTimeCounterInterval);
            // Additional logic when the countdown finishes
        }
    }, 1000);
}

function updateTotalTimeCounter() {
    const counterElement = document.getElementById('totalTimeCounter');
    counterElement.innerText = `Time remaining: ${totalTimeRemaining}`;
}

function resetBackground() {
    document.body.style.backgroundColor = "white";
}

function enableStartButton() {
    startButton.disabled = false;
    startButton.innerText = 'Start'; // Reset the text on the button
}
