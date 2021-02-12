/***** Constants *****/
// for timer
var totalSeconds = 0;

let isGameWon = false;

// store correct values
const letterKey = {
  one: "C",
  two: "H",
  three: "E",
  four: "R",
  five: "L",
  six: "O",
  seven: "W",
  eight: "E",
  nine: "B",
  ten: "A",
  eleven: "T",
  twelve: "E",
  thirteen: "D",
  fourteen: "E",
  fifteen: "V",
  sixteen: "E",
  seventeen: "R",
  eighteen: "E",
  nineteen: "E",
  twenty: "L",
  twentyone: "S",
};

// store user input
let letterInput = {
  one: "",
  two: "",
  three: "",
  four: "",
  five: "",
  six: "",
  seven: "",
  eight: "",
  nine: "",
  ten: "",
  eleven: "",
  twelve: "",
  thirteen: "",
  fourteen: "",
  fifteen: "",
  sixteen: "",
  seventeen: "",
  eighteen: "",
  nineteen: "",
  twenty: "",
  twentyone: "",
};

/***** DOM References *****/
const grid = document.querySelector(".grid-container");
const inputs = document.querySelectorAll(".box > input");
const messageContainer = document.querySelector(".message-container");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const clearButton = document.querySelector("#clear-puzzle");
const checkButton = document.querySelector("#check-puzzle");
const instructions = document.querySelector("#instructions");
const hideInstructionsButton = document.querySelector("#hide-instructions")
const instructionsContainer = document.querySelector("#instructions-container")
const clueContainer = document.querySelector(".clue-container")
const reset = document.querySelector("#reset")

/***** Functions and Game Logic *****/
// initialize game
const updateTimer = () => {
  ++totalSeconds;
  seconds.innerText = formatTimer(totalSeconds % 60);
  minutes.innerText = formatTimer(parseInt(totalSeconds / 60));
};

function formatTimer(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

countUp = setInterval(updateTimer, 1000);

//store input value for letterInput at key index
const updateValue = (e) => {
  let boxNumber = e.target.id;
  let inputValue = e.target.value;
  let uppercase = inputValue.toUpperCase();
  letterInput[boxNumber] = uppercase;
  checkWin();
  if (inputValue.length === 1) {

  }
};

// check if puzzle has been solved
const checkWin = () => {
  for (letter in letterKey) {
    if (letterKey[letter] !== letterInput[letter]) {
      return;
    }
  }
  return winState();
};

// display winState message
const winState = () => {
  isGameWon = true
  messageContainer.classList.remove("hidden");
  reset.classList.remove("hidden");
  if (isGameWon === true) {
    clearInterval(countUp);
  }
  console.log(isGameWon)
};

// clear the puzzle
const clearPuzzle = () => {
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  for (letter in letterInput) {
    letterInput[letter] = "";
  }
};

// check puzzle answers
const checkPuzzle = () => {
    for (i = 0; i < inputs.length; i++) {
      let inputUpper = inputs[i].value.toUpperCase();
      if (inputs[i].value !== "" && inputUpper !== letterKey[inputs[i].id]) {
        inputs[i].classList.add("incorrect");
        grid.addEventListener("input", removeIncorrect);
      }
    }
};

const removeIncorrect = (e) => {
  let targetInput = e.target;
  targetInput.classList.remove("incorrect");
};

// show instructions
const showInstructions = () => {
  instructionsContainer.classList.remove("hidden");
}

// hide instructions
const hideInstructions = () => {
  instructionsContainer.classList.add("hidden");
}

// hightlight selected clue
const highlightClue = (e) => {
  let targetClueSpan = e.target.span
  targetClueSpan.classList.add("cream-highlight")
}

// reset game
const resetGame = () => {
  isGameWon = false;
  clearPuzzle();
  resetTimer();
  messageContainer.classList.add("hidden");
  reset.classList.add("hidden");
  console.log(isGameWon)
}

console.log(isGameWon)

const resetTimer = () => {
  seconds.innerText = "00";
  minutes.innerText = "00";
  updateTimer();
}

/***** Event Listeners *****/
// update letterInput
grid.addEventListener("input", updateValue);
document.addEventListener("DOMContentLoaded", updateTimer);
clearButton.addEventListener("click", clearPuzzle);
checkButton.addEventListener("click", checkPuzzle);
instructions.addEventListener("click", showInstructions);
hideInstructionsButton.addEventListener("click", hideInstructions);
clueContainer.addEventListener("click", highlightClue);
reset.addEventListener("click", resetGame);

// TODO
// remove nav div when you win
// highlight selected clue
// highlight word letter is in

// put clues in spans
