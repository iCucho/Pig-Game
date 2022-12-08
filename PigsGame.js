// @ts-nocheck
'use strict';

// selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions

let scores;
let isGameActive;
let currentScore;
let activePlayer;

// initialize settings function
const init = function () {
  isGameActive = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

// function roll dice functionality
btnRoll.addEventListener('click', function () {
  if (isGameActive) {
    // Generating a roll dice
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceRoll}.png`;

    // Check for a rolled 1, if true switch to next player
    if (diceRoll !== 1) {
      // add diceRoll to current score
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// hold score
btnHold.addEventListener('click', function () {
  if (isGameActive) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player's score is >= 100
    if (scores[activePlayer] >= 30) {
      // finish game
      isGameActive = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
