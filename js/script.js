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


function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  switch (true) {
      case (hours >= 6 && hours < 12):
          return 'morning';
      case (hours >= 12 && hours < 18):
          return 'afternoon';
      case (hours >= 18 && hours < 24):
          return 'evening';
      default:
          return 'night';
  }
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  const greetingElement = document.querySelector('.greeting');
  greetingElement.textContent = greetingText;
}

getTimeOfDay()
showGreeting()

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


// slider
const body = document.querySelector('body')
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum = getRandomNum()

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum).padStart(2, "0");
  body.style.backgroundImage = `url(https://raw.githubusercontent.com/MaximShtaba/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`;
}

setBg()

function getSlideNext() {
  randomNum === 20 ? 1 : randomNum++
  setBg()
}

function getSlidePrev() {
  randomNum === 1 ? 20 : randomNum--
  setBg()
}

slideNext.addEventListener('click',  getSlideNext);
slidePrev.addEventListener('click',  getSlidePrev);