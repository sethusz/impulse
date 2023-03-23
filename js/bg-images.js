'use strict'
const prevSlide = document.querySelector('.slide-prev'),
        nextSlide = document.querySelector('.slide-next');

let randomNum = getRandomNum(),
    randomNumForAPI,
    data;

function getRandomNum(quantity = 20) {
    let num = Math.floor(Math.random() * quantity);
    return String(num).padStart(2, 0);
}

function getPrevSlide() {
    randomNum = (randomNum - 1) % 20 >= 1 ?
        String((randomNum - 1) % 20).padStart(2, 0) : 
            20;
    setBg()
}

function getNextSlide() {
    randomNum = (++randomNum) % 20 >= 1 ?
        String((randomNum) % 20).padStart(2, 0) : 
            20;
    setBg()
}

function setBg() {
    const timeOfDay = getTimeOfDayVal,
        img = new Image();
        
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg")`;
    }

    prevSlide.addEventListener('click', getPrevSlide);
    nextSlide.addEventListener('click', getNextSlide); 
}

setBg()




