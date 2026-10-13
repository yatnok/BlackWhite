// Generate secret code
let secretCode = [];

while (secretCode.length < 4) {
    let randomNum = Math.floor(Math.random() * 6) + 1;

    if (!secretCode.includes(randomNum)) {
        secretCode.push(randomNum);
    }
}

console.log("Secret:", secretCode);

// Game settings
let round = 0;
const maxRounds = 7;

const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const history = document.getElementById("history");
const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", function () {
    location.reload();
});

function clearInput() {
    guessInput.value = "";
    guessInput.focus();
}

// Button click
guessBtn.addEventListener("click", checkGuess);

// Press Enter
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function checkGuess() {

    let input = guessInput.value;

    // Must be exactly 4 digits
    if (input.length !== 4) {
        message.textContent = "Enter exactly 4 numbers!!";
        clearInput();
        return;
    }

    let guess = input.split("").map(Number);

    // Only 1~6
    if (guess.some(num => num < 1 || num > 6)) {
        message.textContent = "Enter only 1 to 6!!";
        clearInput();
        return;
    }

    round++;

    restartBtn.style.display = "inline-block";

    let correctPosition = 0;
    let correctNumber = 0;

    let secretCopy = [...secretCode];
    let guessCopy = [...guess];

    // Check correct position
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretCode[i]) {
            correctPosition++;

            secretCopy[i] = null;
            guessCopy[i] = null;
        }
    }

    // Check correct number but wrong position
    for (let i = 0; i < 4; i++) {

        if (guessCopy[i] === null) continue;

        let index = secretCopy.indexOf(guessCopy[i]);

        if (index !== -1) {
            correctNumber++;
            secretCopy[index] = null;
        }
    }

    let row = document.createElement("div");
    row.classList.add("guess-row");
    
    let feedback = "";
    // White dot
    for (let i = 0; i < correctNumber; i++) {
        feedback += "○";
    }
    // Black dot
    for (let i = 0; i < correctPosition; i++) {
        feedback += "●";
    }
    row.textContent =`${("Attempt " + round + ":").padEnd(12)}${input.padEnd(8)}${feedback}`;row.textContent =`Attempt ${round}: ${input.padEnd(8)}${feedback}`;

    history.prepend(row);
    clearInput();

    // Win
    if (correctPosition === 4) {
        message.textContent = `Unlocked! Your device is restarting.`;

        guessBtn.disabled = true;
        guessInput.disabled = true;
        return;
    }

    // Lose
    if (round >= maxRounds) {
        message.textContent =
        `Your device is locked! The password was ${secretCode.join("")}`;

        guessBtn.disabled = true;
        guessInput.disabled = true;
        return;
    }
}
