let data = {
    1234 : {
        totalButtonCount: 5,
        response: 666
    },
    5678 : {
        totalButtonCount: 10,
        response: 999
    } 
}

let coolDownButton = document.getElementById('coolDown');
let buttonCounterElement = document.getElementById('buttonCounter');
let keypad = document.getElementById('keypad');
let currentButtonCount = 0;
const buttonMaxDelay = 300;
const buttonMinDelay = 100;
const secondsMultiplier = 100;
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
    console.log('CODE IS ' + code);
    currentRun = data[code]
    if (currentRun != null) {
        console.log('START GAME');
        startGame();
    } else {
        // Invalid code action
    }
}


function startGame() {
    setInterval(createCodeLine, 150);
    coolDownButton.disabled = true;
    coolDownButton.style.display = 'none';
    keypad.style.display = 'none';
    clearInput();
    spawnButton(currentButtonCount);
    startButtonCounter();   
}

function spawnButton(buttonCount) {
    if (buttonCount >= currentRun.totalButtonCount) {
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
}

function disableButtonCounter() {
    buttonCounterElement.style.display = 'none';
}

function winGame() {
    document.body.style.backgroundColor = "green";
    disableWaiting();
    enableFinished();
    disableButtonCounter();
    enableResponse();
}

function enableResponse() {
    document.getElementById('response').style.display = 'block';
    document.getElementById('response').innerText = 'Response code: ' + currentRun.response;
}

function looseGame() {
    disableWaiting();
    enableFailed();
    clearExistingButtonAndTimer(buttonContainer);
    startCooldown();
    document.body.style.backgroundColor = "#53202d";
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
