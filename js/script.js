const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);

  
}

function showdate() {
  const dateS = new Date();
  const options = {weekday: 'long' , month: 'long', day: 'numeric' };
  const currentDate = dateS.toLocaleDateString('en-US', options);
  date.textContent = currentDate;
  setTimeout(showdate, 1000);
}

showTime();
showdate()

const greeting = document.querySelector('.greeting');


// const dateGreeting = new Date();
// const hours = dateGreeting.getHours();

let hours = 0

function getTimeOfDay() {
  if (hours <= 6) {
    greeting.textContent = 'Good night!';
  } else if (hours <= 12) {
    greeting.textContent = 'Good morning!';
  } else if (hours <= 18) {
    greeting.textContent = 'Good afternoon!';
  } else if (hours <= 23) {
    greeting.textContent = 'Good evening!';
  }
}

getTimeOfDay()

const nameGreeting = document.querySelector('.name');


function setLocalStorage() {
  localStorage.setItem('name', nameGreeting.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    nameGreeting.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)

