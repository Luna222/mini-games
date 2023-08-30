'use strict';

//👉 selecting elements
//✨ .getElementById() little bit faster than querySelector
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing; //undefined

//<< initialize default states >>:
const init = function () {
  scores = [0, 0]; //final scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //👀 JS automatically convert these number value to string displayed on the page
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init(); //will be executed when loading the page

const switchPlayer = function () {
  //switch to next player: reasign active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  /* ✨.toggle() method will add the class if it is NOT there
      & remove the class if it is there
  */
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//👉 Rolling dice functionality
btnRoll.addEventListener('click', function () {
  /*❗️if playing = true -> apply logic
    if playing = false -> no response 
  */
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    //👀 we can dynamically load 1 of the 6 images here depdending on the random rolled dice
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      //select current score element ✨dynamically based on current active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player: reasign active player
      switchPlayer();
    }
  }
});

//👉 Holding Current Score
btnHold.addEventListener('click', function () {
  /*❗️if playing = true -> apply logic
    if playing = false -> no response 
  */
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //🎉 finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//👉 Resetting the Game
btnNew.addEventListener('click', init);
