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


//slider 

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

// Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d957187310c6b7cdb3a04ebeb59e2b17&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// quotes 

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const button = document.querySelector('.change-quote')

async function getQuote() {
  const res = await fetch('data.json')
  const data = await res.json()
  const randomIndex = Math.floor(Math.random() * data.length)
  const randomQuote = data[randomIndex]
  quote.textContent = randomQuote.text
  author.textContent = randomQuote.author
}

getQuote()

button.addEventListener('click', getQuote)

// Music 

const audio = new Audio();

const playPrevBtn = document.querySelector('.play-prev');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const volumeSlider = document.querySelector('.volume-slider');

const playList = document.querySelector('.play-list');
const tracks = [
  { name: 'Aqua Caelestis', src: '../assets/sounds/Aqua Caelestis.mp3' },
  { name: 'River Flows In You', src: '../assets/sounds/River Flows In You.mp3' },
  { name: 'Summer Wind', src: '../assets/sounds/Summer Wind.mp3' },
  { name: 'Ennio Morricone', src: '../assets/sounds/Ennio Morricone.mp3' },
];

let currentTrackIndex = null;
audio.src = '';

function play() {
  audio.play();
  playBtn.classList.remove('play');
  playBtn.classList.add('pause');
  updateCurrentTrack();
}

function pause() {
  audio.pause();
  playBtn.classList.remove('pause');
  playBtn.classList.add('play');
  updateCurrentTrack();
}

function playPrev() {
  if (currentTrackIndex === 0) {
    currentTrackIndex = tracks.length - 1;
  } else {
    currentTrackIndex--;
  }
  audio.src = tracks[currentTrackIndex].src;
  play();
}

function playNext() {
  if (currentTrackIndex === tracks.length - 1) {
    currentTrackIndex = 0;
  } else {
    currentTrackIndex++;
  }
  audio.src = tracks[currentTrackIndex].src;
  play();
  updateCurrentTrack();
}

function changeVolume() {
  audio.volume = volumeSlider.value / 100;
}

function updateCurrentTrack() {
  const links = playList.querySelectorAll('a');
  links.forEach((link, index) => {
    if (currentTrackIndex !== null && index === currentTrackIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

playBtn.addEventListener('click', function() {
  if (audio.paused) {
    if (currentTrackIndex === null) {
      currentTrackIndex = 0;
      audio.src = tracks[currentTrackIndex].src;
    }
    play();
  } else {
    pause();
  }
});

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
volumeSlider.addEventListener('input', changeVolume);

tracks.forEach((track, index) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '#';
  a.textContent = track.name;
  a.addEventListener('click', function(event) {
    event.preventDefault();
    currentTrackIndex = index;
    audio.src = tracks[currentTrackIndex].src;
    play();
  });
  li.appendChild(a);
  playList.appendChild(li);
});

updateCurrentTrack();

const links = playList.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    currentTrackIndex = Array.from(links).indexOf(link);
    audio.src = tracks[currentTrackIndex].src;
    play();
  });
});

