'use strict';

//<< 🌟 [UI Component] Modal Window >>
//--> click on the overlay outside/x button/escape key to exit
//📝 Note: ✨manipulating classes is the main way in which we manipulate webpages

//👉 select & store elements
/*[❗️when using .querySelector('<selector>')
--> only the FIRST element will get selected]
*/
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
/*[👍 use ✨.querySelectorAll('<selector>')]
--> returns an ARRAY-liked containing ALL selected elements with the same class
*/
const btnShowModal = document.querySelectorAll('.show-modal');
console.log(btnShowModal);
// for (let i = 0; i < btnShowModal.length; i++)
//   console.log(btnShowModal[i].textContent);
// btnShowModal.forEach(node => console.log(node.textContent));

//👉 specify functions
const openModal = function () {
  //[👍 use ✨classList object] to ❗️manipulate classes
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  // modal.style.display = 'block';
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//👉 open modal for each button element:
//--> attach ✨eventHandler/listener for each button & will be executed when click event happened
btnShowModal.forEach(node => node.addEventListener('click', openModal));

//👉 click on close button to exit the modal
btnCloseModal.addEventListener('click', closeModal);

//👉 click on the overlay outside to exit the modal
overlay.addEventListener('click', closeModal);

/*[✨Keyboard Event also called ✨Global Events]
bc they do not happen on one specific element
--> ❗️usually listen on the whole document:
when using event listener on document, listen for event everywhere happening on the page & trigger the event handler

📝 there are 3 types of events for the keyboard:
~ keyup: only happens when we lift our finger off the key or keyboard
~ keydown: is fired as soon as we just press down the key
~ keypress: is fired continously as we keep our finger on a certain key
*/

//👉 handling an ✨'Esc' Keypress Event
/*❗️👀 everytime the event occurs, JS generate an object containing
all the information about the event itself & ❗️we can access that object in the event handler function w/ an event object as an argument
*/
document.addEventListener('keydown', function (e) {
  console.log('a key was pressed no matter which one!');
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
