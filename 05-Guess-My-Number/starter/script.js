'use strict';
/* << 🌟 DOM Manipulation >>
make JavaScript interact with a webpage
*/

/*
~ use Math.trunc() function to get rid of the decimal part
~ Math.trunc(random() * 20) gives a number btw 0 & 19
-> Math.trunc(random() * 20) + 1 to get a number btw 1 & 20
*/
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(`secret number: ${secretNumber}`);

let score = 20;
let currentHighScore = 0;
let prevHighScore = 0;

// let highscore = 0;

const displayMessage = function (message) {
  msg.textContent = message;
};

//=== 🤍 Todo: Selecting & Manipulating Elements from a webpage ===

/*[👍 querySelector(<a CSS selector>) method is basically a method that's available on the ✨document object]*/
//📝 note: when we have multiple . operators, they are executed from left to right
//👉 select the element
const msg = document.querySelector('.message');
const guessInput = document.querySelector('.guess');
const scoreElement = document.querySelector('.score');
const secretNumberElement = document.querySelector('.number');
const highScoreElement = document.querySelector('.highscore');
const body = document.querySelector('body');

//👉 GET/retrieve the text content of the element (DOM node)
document.querySelector('.message').textContent;
console.log(document.querySelector('.message').textContent);

//👉 SET/manipulate the content of the element (DOM node)
// document.querySelector('.message').textContent = '🎉 Correct Number!';
// document.querySelector('.number').textContent = 14;
// document.querySelector('.score').textContent = 10;
// guessInput.value = 23;

// console.log(document.querySelector('.message').textContent);
// console.log(guessInput.value); //use value property

//=== 🤍 Todo: Handling Click Events & Implementing the Game Logic ===
/*[👍 use ✨Event Listener]
an event is something that happens on the page:
E.g. a mouse click/moving, a key press, many other events
--> ❗️with an ✨Event Listener, we can wait/listen for a certain event to happen and then react/response to it
*/

/*👉 listen to the event on button check element
~ where the click happened
*/
/*[👍 use addEventListener(<type of event>, <reaction: eventHandlerFunction()>) method — the mostly used]
❗️function passed into addEventListener() method will be executed whenever the click event happens on the element — called ✨Event Handler & is a special kind of function & a function expression

❗️this function will only be call AS SOON AS the Event happens
*/
document.querySelector('.check').addEventListener('click', function () {
  //👉 convert input value from String to Number
  const guessValue = Number(guessInput.value);
  console.log(guessValue, typeof guessValue);
  console.log(typeof secretNumberElement.style);

  //Scenario 1️⃣: There's no Input
  //👉 check if user didn't input any value (guessValue = 0)
  //0 is a falsy value -> FALSE => !guessValue === TRUE
  if (!guessValue) {
    //will be executed ONLY when if TRUE
    // msg.textContent = '⛔️ No number!';
    displayMessage('⛔️ No number!');

    //Scenario 2️⃣: The guess is CORRECT (equals to the secret number)
  } else if (guessValue === secretNumber) {
    // msg.textContent = '🎉 Correct Number!';
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    //👉 Save & display highscore
    currentHighScore = score;

    if (currentHighScore > prevHighScore) {
      highScoreElement.textContent = currentHighScore;
    }
    prevHighScore = currentHighScore;

    //another way
    // if (score > highscore) {
    //   highscore = score;
    //   highScoreElement.textContent = highscore;
    // }

    //=== 🤍 Todo: Manipulating CSS Styles ===
    //[👍 use ✨style object] (~ will be specify in inline style on the element)
    //👉 change/SET background-color property
    body.style.backgroundColor = '#60b347';

    //👉 change/SET width property -> ❗️the value has to be a String
    secretNumberElement.style.width = '30rem';

    //Scenario 3️⃣: The guess is WRONG (different from the secret number)
  } else if (guessValue !== secretNumber) {
    //Scenarios 3.1, 3.2: The guess is GREATER/LOWER than the secret number)
    if (score > 1) {
      // msg.textContent =
      //   guessValue > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(
        guessValue > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      scoreElement.textContent = score;
    } else {
      // msg.textContent = '🥀 You lost the game!';
      displayMessage('🥀 You lost the game!');
      scoreElement.textContent = 0;
    }
  }
});

//👀 a function value
// function() {
//   console.log(27);
// }

///////////////////////////////////////
// 🔥 Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
const resetButton = document.querySelector('.again');
resetButton.addEventListener('click', function () {
  //RESET;
  secretNumberElement.textContent = '?';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(`secret number: ${secretNumber}`);

  score = 20;
  scoreElement.textContent = score;
  console.log(score);

  // msg.textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  guessInput.value = '';

  body.style.backgroundColor = '#222';
  secretNumberElement.style.width = '15rem';
});

/*[👍 LAST STEP: ✨Refactoring Our Code: The DRY Principle]
✨Refactoring basically means to restructure the code 
but without changing how it work:
~ improve the code
~ eliminate duplicate code

❗️Nếu không refactor code thì ta sẽ phải sửa rất nhiều đoạn code giống nhau khi cần thay đổi 1 điều gì đó
*/
