// Game Elements
const maxNumb = 100;
// HTML Selectors
const gameCoreBlock = document.querySelector(".gameCoreWrapper");
const userInput = document.querySelector("#guessNumb");
const submitBtn = document.querySelector("#guessSubmit");
const guessHistory = document.querySelector(".yourGuesses");
const guessesRemaining = document.querySelector(".guessesRemaining");
const guessHelp = document.querySelector(".guessHelp");
const endGameText = document.querySelector(".gameStatusText");
const endGameBtn = document.querySelector(".endgame");

let randNumber = Math.floor((Math.random() * maxNumb) + 1);
let isPlaying = true;
let guessesAvailable = 10;


if (isPlaying) {
    submitBtn.addEventListener("click", function() {
        event.preventDefault();

        validateInput(userInput.value);
    });
}

function validateInput(numb) {
    if (isNaN(numb)) {
        alert("You must input numbers!");
    } else if (numb < 1) {
        alert("You must input number greater than 0");
    } else if (numb > maxNumb) {
        alert("You must input number lower than " + maxNumb);
    } else {
        updateGuesses(numb);
        if (guessesAvailable > 0) {
            checkGuess(numb);
        } else {
            updateStatus("lost");
        }
        userInput.value = "";
    }
}

function checkGuess(numb) {
    if (randNumber === parseInt(numb)) {
        updateStatus("won");
        guessHelp.innerHTML = "You have won the game!";
    } else if (randNumber > numb) {
        guessHelp.innerHTML = "Try a higher number!";
    } else if (randNumber < numb) {
        guessHelp.innerHTML = "Try a lower number!";
    }
}

function updateGuesses(guess) {
    guessesAvailable--;
    guessesRemaining.innerHTML = `guesses remaining: ${guessesAvailable}`;
    guessHistory.innerHTML += `${guess} `;
}

function updateStatus(status) {
    if (status == "won") {
        endGameText.innerHTML = "You have won the game, restart below!";
        endGameText.style.color = '#28f495';
        stopGame();
    } else if (status == "lost") {
        endGameText.innerHTML = "You have lost the game, restart below!";
        endGameText.style.color = '#ec7272';
        stopGame();
    }

    endGameBtn.addEventListener("click", function() {
        event.preventDefault();
        restartGame();
    });
}

function stopGame() {
    isPlaying = false;
    gameCoreBlock.style.opacity = "0.1";
    endGameBtn.style.display = "block";
    userInput.value = "";
    userInput.setAttribute('disabled', '');
    submitBtn.setAttribute('disabled', '');
}

function restartGame() {
    isPlaying = true;
    randNumber = Math.floor((Math.random() * maxNumb) + 1);
    endGameText.innerHTML = "";
    endGameBtn.style.display = "none";
    userInput.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    userInput.value = "";
    guessesAvailable = 10;
    gameCoreBlock.style.opacity = "1";
    guessHistory.innerHTML = "previous guesses: <br/>";
    guessesRemaining.innerHTML = `guesses remaining: ${guessesAvailable}`;
    guessHelp.innerHTML = "input a number to get help!";
}