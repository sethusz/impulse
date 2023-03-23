'use strict'

let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=b2e59c901aca4bdda98879d8406d048b&units=metric'
const weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      wind = document.querySelector('.wind'),
      humidity = document.querySelector('.humidity'),
      weatherDescription = document.querySelector('.weather-description'),
      cityInput = document.querySelector('.city'),
      errorOutput = document.querySelector('.weather-error');

function weatherFunc(
    weatherLang = 'en',
    windLang = 'Wind speed',
    windMS = 'm/s',
    humidityLang = 'Humidity',
    inputErr = 'City name must be longer than 2 characters',
    defaultCityName = 'Lviv',
    ) {
    function changeCity() {
        if (cityInput.value && cityInput.value.length >= 2) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${weatherLang}&appid=b2e59c901aca4bdda98879d8406d048b&units=metric`
            localStorage.setItem('cityName', cityInput.value);
            getWeather();
        } else {
            errorOutput.textContent = inputErr;
            clearWeatherOutput()
        }
    }
    
    function clearWeatherOutput() {
        weatherIcon.classList.remove(`owf-${iconClass}`);
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
    
    function throwError(output, err) {
        output.textContent = `Error ${err} for '${cityInput.value}'`;
        clearWeatherOutput()
    }
    
    if(localStorage.getItem('cityName')) {
        cityInput.value = localStorage.getItem('cityName')
        changeCity()
    } else {
        cityInput.value = defaultCityName;
        changeCity()
    }
    
    cityInput.addEventListener('blur', changeCity)
    cityInput.addEventListener('keyup', (e) => {
        if(e.code === 'Enter') {
            changeCity()
        }
    })
    
    let iconClass;
    
    async function getWeather() {
        let result,
            data;
        try {
            result = await fetch(weatherUrl);
            data = await result.json();
            iconClass = data.weather[0].id;
            weatherIcon.classList.add(`owf-${iconClass}`);
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `${windLang}: ${Math.round(data.wind.speed)} ${windMS}`;
            humidity.textContent = `${humidityLang}: ${data.main.humidity}%`;
            errorOutput.textContent = '';
        } catch (e) {
            console.error(e);
            throwError(errorOutput, data.message)
        }
    }
}

weatherFunc()
