const settingbtn = document.querySelector(".setting-btn");
const form = document.querySelector(".form");
const downbtn = document.querySelector(".down-btn");
const select = document.querySelector(".select");
const inputbox = document.getElementById("input");
const scoreEl = document.getElementById("scoreone");
const time = document.querySelector(".time");
const word = document.querySelector(".word");
const gamecontainer = document.querySelector(".game-container");
const endgamecontainer = document.querySelector(".endgame-container");
const highestscore = document.querySelector(".highest-score");

inputbox.focus();
inputbox.value = "";

//list of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];
// initial score
let score = 0;

// initial high score
let highscore = 0;

// initial time
let countdown = 10;

// set difficulty value in local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
select.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set highest score
highscore =
  localStorage.getItem("highestscore") !== null
    ? localStorage.getItem("highestscore")
    : "0";
highestscore.innerHTML = highscore;

//select random word
function randomword() {
  return words[Math.floor(Math.random() * words.length)];
}

//generating random word from words array

function randomname() {
  randomword();
  let names = randomword();
  word.innerHTML = names;
}

//updating current score
function currentscore() {
  scoreEl.innerHTML = score;
}

//updating highest score
function higherscore() {
  if (score > highscore) {
    highscore = score;
    highestscore.innerHTML = highscore;

    localStorage.setItem("highestscore", highscore);

    // showconfetti();
    setTimeout(() => conf.classList.remove("active"), 2000);
  }
}

//updating time
function updatetime() {
  countdown--;

  time.innerHTML = countdown + "s";

  if (countdown === 0) {
    showendgame();
  }
}

//showimg end game
function showendgame() {
  higherscore();

  endgamecontainer.innerHTML = `
    <h1>time ran out</h1>
    <p>your final score is ${score}</p>
    <p>your highest score is ${highestscore.innerHTML}</p>

    <button class="btn" onclick ="location.reload()"> reload</button>
    `;

  endgamecontainer.style.display = "flex";
}

//increasing score

function increasescore(e) {
  if (e.target.value === word.innerHTML) {
    randomname();
    score++;
    scoreEl.innerHTML = score;
    e.target.value = "";

    // increasing time depends on difficulty value
    if (difficulty === "easy") {
      countdown = countdown + 5;
    } else if (difficulty === "medium") {
      countdown = countdown + 3;
    } else {
      countdown = countdown + 2;
    }
    updatetime();
  }
}

// user input field event listener
inputbox.addEventListener("input", increasescore);

// setting button click
settingbtn.addEventListener("click", () => {
  form.classList.toggle("show");
});

// selecting difficulty level
form.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

higherscore();

randomname();
currentscore();
const timeinterval = setInterval(updatetime, 1000);
