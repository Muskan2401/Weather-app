const apiKey = 'bcd993cf90msh2e9fd27aa405545p10f611jsnad65c066f479'; 
const apiUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json';

// Retieves the weather data with syntax of a promise-resolve or reject with appropriate error
async function fetchWeatherData(location) {
    const fullUrl = `${apiUrl}?q=${location}&3days`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        fetch(fullUrl, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data. Please check the location.');
                }
                return response.json();
            })
            .then((data) => {
              
                const cityName = data.location.name;
                const region = data.location.region;
                const country = data.location.country;
                const temperature = data.current.temp_c;
                const condition = data.current.condition.text;
                const wind = data.current.wind_mph;
                const humidity = data.current.humidity;
                const precip = data.current.precip_mm;
                const gust = data.current.gust_mph;
                const localtime = data.location.localtime;
                const conditionIconUrl = data.current.condition.icon;


              
                resolve({
                    cityName,
                    region,
                    country,
                    temperature,
                    condition,
                    wind,
                    humidity,
                    
                    precip,
                    gust,
                    localtime,
                    conditionIconUrl,
                    
                });
            })
            .catch((error) => {
                
                reject(error);
                document.getElementById('city-name').innerHTML=`Error: ${error.message}`
            });
    });
}

// Calls fetchWeatherData function and displays the weatherdata values and additional information
async function displayWeather() {
    const locationInput = document.getElementById('location');

    const location = locationInput.value;

    try {
        const weatherData = await fetchWeatherData(location);

        document.getElementById('city-name').innerHTML = `<span class="glyphicon glyphicon-map-marker"></span> ${weatherData.cityName}, ${weatherData.country}`;
        const date = new Date(weatherData.localtime);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const options = { day: 'numeric', month: 'short' };
        const dateMonth = date.toLocaleDateString(undefined, options);
        document.getElementById('date').innerHTML = `${dayOfWeek}, ${dateMonth}<br>`;
        document.getElementById('temperature').innerHTML= `<h1>${weatherData.temperature}°</h1> Celsius <span class="glyphicon glyphicon-leaf"></span><br><br>`;
        document.getElementById('condition').textContent = `${weatherData.condition} with ${weatherData.humidity}% humidity`;
        document.getElementById('timing').textContent = date.toLocaleTimeString();
        document.getElementById('condition-icon').src = weatherData.conditionIconUrl;

        document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
                document.getElementById('windspeed').textContent = `${weatherData.wind}mph`;
                document.getElementById('precipitation').textContent = `${weatherData.precip}mm`;
                document.getElementById('gust').textContent = `${weatherData.gust}mph`;

    } catch (error) {
       
        console.error(`Error: ${error.message}`);
        document.getElementById('city-name').innerHTML=`Error: ${error.message}`
    }
}

window.addEventListener('load', displayWeather);
setInterval(displayWeather, 5000);