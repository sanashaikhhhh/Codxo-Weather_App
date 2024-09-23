const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = '12dd768f1be0c1b5bc870ba4be69b73e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        console.log("Weather data retrieved");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Cloudyy':
                weather_img.src = "./asserts/Cloudyy.png";
                break;
            case 'Sunny':
                weather_img.src = "./asserts/Sunny.png";
                break;
            case 'Rainy':
                weather_img.src = "./asserts/Rainy.png";
                break;
            case 'Mist':
                weather_img.src = "./asserts/Mist.png";
                break;
            case 'Thunder':
                weather_img.src = "./asserts/Thunder.png";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching the weather data", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
