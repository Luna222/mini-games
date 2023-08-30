'use strict';

let diceResult = 0;
let currentScore1 = 0;
let currentScore2 = 0;
let finalScore1 = 0;
let finalScore2 = 0;
let player = 1;
let isHold = false;
let playing = true;

const disabled = document.createAttribute('disabled');

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const playerEle1 = document.querySelector('.player--0');
const playerEle2 = document.querySelector('.player--1');
const currentScoreEle1 = document.querySelector('#current--0');
const currentScoreEle2 = document.querySelector('#current--1');
const finalScoreEle1 = document.querySelector('#score--0');
const finalScoreEle2 = document.querySelector('#score--1');

//default states
dice.classList.add('hidden');
finalScoreEle1.textContent = finalScore1;
finalScoreEle2.textContent = finalScore2;

//🤞 generate random dice roll (1 - 6)
const diceRoll = function (max) {
  return Math.trunc(Math.random() * max) + 1;
};

const switchPlayer = function () {
  /* ✨.toggle() method will add the class if it is NOT there
      & remove the class if it is there
  */
  playerEle1.classList.toggle('player--active');
  playerEle2.classList.toggle('player--active');
};

const resetGame = function () {
  diceResult = 0;
  currentScore1 = 0;
  currentScore2 = 0;
  finalScore1 = 0;
  finalScore2 = 0;
  player = 1;
  isHold = false;
  playing = true;

  currentScoreEle1.textContent = currentScore1;
  currentScoreEle2.textContent = currentScore2;
  finalScoreEle1.textContent = finalScore1;
  finalScoreEle2.textContent = finalScore2;

  playerEle1.classList.add('player--active');
  playerEle2.classList.remove('player--active');
  dice.classList.add('hidden');
  playerEle1.classList.remove('player--winner');
  playerEle2.classList.remove('player--winner');
};

//🤍 Todo: Rolling the Dice
//🤍 Todo: Switching the Active Player
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceResult = diceRoll(6);
    console.log('🎲 Dice roll:', diceResult);

    switch (diceResult) {
      case 1:
        dice.setAttribute('src', 'dice-1.png');
        break;
      case 2:
        dice.setAttribute('src', 'dice-2.png');
        break;
      case 3:
        dice.setAttribute('src', 'dice-3.png');
        break;
      case 4:
        dice.setAttribute('src', 'dice-4.png');
        break;
      case 5:
        dice.setAttribute('src', 'dice-5.png');
        break;
      case 6:
        dice.setAttribute('src', 'dice-6.png');
        break;
      default:
        return;
    }
    //👉 display dice roll
    dice.classList.remove('hidden');

    //👉 [✨player 1] add dice roll to current score
    if (player === 1) {
      if (diceResult === 1) {
        currentScore1 = 0;
        diceResult = 0;
        switchPlayer();
        player = 2;
      } else {
        currentScore1 += diceResult;
      }
      //👉 [✨player 1] display current score
      currentScoreEle1.textContent = currentScore1;
    }

    //👉 [✨player 2] add dice roll to current score
    if (player === 2) {
      if (diceResult === 1) {
        currentScore2 = 0;
        diceResult = 0;
        switchPlayer();
        player = 1;
      } else {
        currentScore2 += diceResult;
      }
      //👉 [✨player 2] display current score
      currentScoreEle2.textContent = currentScore2;
    }
  }
});

//🤍 Todo: Holding Current Score
//🤍 Todo: Switching the Active Player
btnHold.addEventListener('click', function () {
  if (playing) {
    isHold = true;
    //👉 [✨player 1] Holding Current Score
    if (player === 1 && isHold === true) {
      finalScore1 += currentScore1;
      //👉 [✨player 1] display current Final Score
      finalScoreEle1.textContent = finalScore1;
      if (finalScore1 < 20) {
        currentScore1 = 0;
      }
      switchPlayer();
      isHold = false;
      player = 2;
      //👉 [✨player 1] display current score
      currentScoreEle1.textContent = currentScore1;
    }

    //👉 [✨player 2] Holding Current Score
    if (player === 2 && isHold === true) {
      finalScore2 += currentScore2;
      //👉 [✨player 2] display current Final Score
      finalScoreEle2.textContent = finalScore2;
      if (finalScoreEle2 < 20) {
        currentScore2 = 0;
      }
      switchPlayer();
      isHold = false;
      player = 1;
      //👉 [✨player 2] display current score
      currentScoreEle2.textContent = currentScore2;
    }

    //👉 Decide the winner 🎉
    if (finalScore1 >= 20) {
      playerEle1.classList.add('player--winner');
      playerEle1.classList.remove('player--active');
      dice.classList.add('hidden');
      playing = false;
    } else if (finalScore2 >= 20) {
      playerEle2.classList.add('player--winner');
      playerEle2.classList.remove('player--active');
      dice.classList.add('hidden');
      playing = false;
    }
  }
});

//🤍 Todo: Resetting the Game
btnNew.addEventListener('click', resetGame);
