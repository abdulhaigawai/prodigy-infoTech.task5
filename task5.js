const API_KEY = '3e986b4e118b0340027c04be59b08c0b'; // Replace with your OpenWeather API key
const weatherInfo = document.getElementById('weatherInfo');
const fetchWeatherBtn = document.getElementById('fetchWeather');
const getLocationBtn = document.getElementById('getLocation');

// Fetch weather by city name
fetchWeatherBtn.addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a location!</p>';
    }
});

// Fetch weather using Geolocation
getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            () => {
                weatherInfo.innerHTML = '<p>Unable to get your location.</p>';
            }
        );
    } else {
        weatherInfo.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
});

// Fetch weather data using city name
function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch(() => {
            weatherInfo.innerHTML = '<p>Could not fetch weather data. Please check the location.</p>';
        });
}

// Fetch weather data using coordinates
function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch(() => {
            weatherInfo.innerHTML = '<p>Could not fetch weather data.</p>';
        });
}

// Display weather data
function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = '<p>Could not fetch weather data. Please try again.</p>';
    }
}