'use strict'

const timeOutput = document.querySelector('.time'),
  dateOutput = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  hours = new Date().getHours(),
  inputName = document.querySelector('.name');
let timeOut;

function timeGreeting() {

  clearTimeout(timeOut)
  function showTime() {
    const date = new Date(),
      currentTime = date.toLocaleTimeString();

    timeOutput.textContent = currentTime;
    showDate();

    greeting.textContent = `${showGreetings()} ${getTimeOfDayText()}`

    timeOut = setTimeout(showTime, 1000)
  }

  showTime()

  function showDate() {
    const date = new Date(),
      options = { weekday: 'long', month: 'long', day: 'numeric' },
      currentDate = date.toLocaleDateString('en-En', options);

    dateOutput.textContent = currentDate;
  }

  function showGreetings() {
    if (hours >= 6 && hours < 12) {
      return 'Good';
    } else if (hours >= 12 && hours < 18) {
      return 'Good';
    } else if (hours >= 18 && hours < 24) {
      return 'Good';
    } else if (hours >= 0 && hours < 6) {
      return 'Good';
    }
  }
  function getTimeOfDayText() {
    if (hours >= 6 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
      return 'evening';
    } else if (hours >= 0 && hours < 6) {
      return 'night';
    }
  }
  function getTimeOfDayForBg() {
    if (hours >= 6 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
      return 'evening';
    } else if (hours >= 0 && hours < 6) {
      return 'night';
    }
  }
  getTimeOfDayVal = getTimeOfDayForBg();

  function setLocalStorage() {
    localStorage.setItem('name', inputName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if (localStorage.getItem('name')) {
      inputName.value = localStorage.getItem('name');
    }
  }

  inputName.placeholder = 'Enter Name';

  window.addEventListener('load', getLocalStorage)
}

let getTimeOfDayVal;

timeGreeting()