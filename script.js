let coolDownButton = document.getElementById('coolDown');
let buttonCounterElement = document.getElementById('buttonCounter');
let keypad = document.getElementById('keypad');
let currentButtonCount = 0;
const buttonMaxDelay = 30000;
const buttonMinDelay = 10000;
const secondsMultiplier = 10000;
const buttonTimer = 5;
let currentRun = null;

document.querySelectorAll('#keys button').forEach(button => {
    button.addEventListener('click', () => {
        let currentInput = document.getElementById('codeInput').value;
        if (button.textContent !== 'Clear' && button.textContent !== 'Enter') {
            if (currentInput.length < 4) {
                document.getElementById('codeInput').value += button.textContent;
            }
        }
    });
});

function clearInput() {
    document.getElementById('codeInput').value = '';
}

function submitCode() {
    let code = document.getElementById('codeInput').value;
    currentRun = data[code]
    if (currentRun != null) {
        startGame();
    } else {
        invalidCode();
    }
}

function invalidCode(){
    var element = document.getElementById('codeInput');
    var originalBgColor = element.style.backgroundColor;
    element.style.backgroundColor = 'red';
    setTimeout(function() {
        element.style.backgroundColor = originalBgColor;
        clearInput();
    }, 1500);
}

function startGame() {
    currentButtonCount = 0;
    setInterval(createCodeLine, 150);
    coolDownButton.disabled = true;
    coolDownButton.style.display = 'none';
    keypad.style.display = 'none';
    clearInput();
    spawnButton(currentButtonCount);
    startButtonCounter();   
}

function winGame() {
    document.body.style.backgroundColor = "green";
    disableWaiting();
    enableFinished();
    disableButtonCounter();
    enableResponse();
}

function looseGame() {
    disableWaiting();
    enableFailed();
    clearExistingButtonAndTimer(buttonContainer);
    startCooldown();
    document.body.style.backgroundColor = "#53202d";
    buttonCounterElement.style.display = 'none';
}

function startCooldown() {
    coolDownButton.disabled = true;
    let cooldownTime = 3;
    coolDownButton.innerText = `Cooldown: ${cooldownTime} s`;
    coolDownButton.style.display = 'block';

    const cooldownTimer = setInterval(() => {
        cooldownTime--;
        coolDownButton.innerText = `Cooldown: ${cooldownTime} s`;
        if (cooldownTime == 0) {
            clearInterval(cooldownTimer);
            window.location.reload();
        }
    }, 1000);
}

function spawnButton(buttonCount) {
    if (buttonCount >= currentRun.totalButtonCount) {
        winGame();
        return;
    }
    let buttonContainer = document.getElementById('buttonContainer');
    clearExistingButtonAndTimer(buttonContainer);

    let button = createButton();
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
        if (currentButtonCount >= currentRun.totalButtonCount) {
            winGame();
            return;
        }
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

function enableWaiting(){
    document.getElementById("waiting").style.display = 'block';
}

function disableWaiting(){
    document.getElementById("waiting").style.display = 'none';
}

function enableResponse() {
    document.getElementById('response').style.display = 'block';
    document.getElementById('response').innerText = 'Response code: ' + currentRun.response;
}

function startButtonCounter() {
    updateButtonCounter();
    buttonCounterElement.style.display = 'block';
}

function updateButtonCounter() {
    buttonCounterElement.innerText = `Sequence in progress... ${currentButtonCount}/${currentRun.totalButtonCount}`;
}

function enableFailed() {
    document.getElementById('failed').style.display = 'block';
}

function enableFinished() {
    document.getElementById('finished').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
}

function disableButtonCounter() {
    buttonCounterElement.style.display = 'none';
}