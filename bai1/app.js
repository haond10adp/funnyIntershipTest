'use strict';
let player1 = {
  currentScore: document.getElementById('current-0'),
  globalScore: document.getElementById('score-0'),
};
let player2 = {
  currentScore: document.getElementById('current-1'),
  globalScore: document.getElementById('score-1'),
};

const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const player1Panel = document.querySelector('.player-0-panel');
const player2Panel = document.querySelector('.player-1-panel');
let diceImg = document.querySelector('.dice');
let finalScoreElem = document.querySelector('.final-score');

let player1turn = true;

const newBtn = document.querySelector('.btn-new');
newBtn.onclick = function () {
  player1.currentScore.textContent = 0;
  player1.globalScore.textContent = 0;
  player2.currentScore.textContent = 0;
  player2.globalScore.textContent = 0;
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  rollBtn.style.cursor = 'pointer';
  holdBtn.style.cursor = 'pointer';
  player1turn = true;
  player2Panel.classList.remove('active');
  player1Panel.classList.add('active');
  finalScoreElem.value = '';
};

function roll() {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `dice-${dice}.png`;
  return dice;
}

rollBtn.onclick = function () {
  let dice = roll();
  let player = player1turn ? player1 : player2;

  if (dice == 1) {
    player.currentScore.textContent = 0;
    player1turn = !player1turn;

    player1Panel.classList.toggle('active');
    player2Panel.classList.toggle('active');

    return;
  }

  player.currentScore.textContent = +player.currentScore.textContent + dice;
  if (
    +player.globalScore.textContent + +player.currentScore.textContent >=
    100
  ) {
    player.globalScore.textContent =
      +player.globalScore.textContent + +player.currentScore.textContent;
    checkWinner();
  }
};

holdBtn.onclick = function () {
  let player = player1turn ? player1 : player2;
  player.globalScore.textContent =
    +player.globalScore.textContent + +player.currentScore.textContent;
  checkWinner();
  player.currentScore.textContent = 0;
  player1turn = !player1turn;

  player1Panel.classList.toggle('active');
  player2Panel.classList.toggle('active');
};

function checkWinner() {
  if (
    player1.globalScore.textContent >= 100 ||
    player2.globalScore.textContent >= 100
  ) {
    finalScoreElem.value = `${player1.globalScore.textContent} - ${player2.globalScore.textContent}`;
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    rollBtn.style.cursor = 'not-allowed';
    holdBtn.style.cursor = 'not-allowed';
  }
}
