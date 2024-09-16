document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.getElementById('citySelected');
    const weatherInfo = document.getElementById('weather-info');

    citySelect.addEventListener('change', function() {
        const selectedOption = citySelect.options[citySelect.selectedIndex];
        const coordinates = JSON.parse(selectedOption.value);

        // Make an API call to get the weather forecast
        fetch(`https://www.7timer.info/bin/civillight.php?lon=${coordinates.lon}&lat=${coordinates.lat}&ac=0&unit=metric&output=json&tzshift=0`)
            .then(response => response.json())
            .then(data => {
                // Display the weather information
                displayWeatherInfo(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
            });
    });

    function displayWeatherInfo(data) {
        let html = '';
        data.dataseries.forEach(day => {
            html += `
                <div class="weather-day">
                    <h3>${formatDate(day.date)}</h3>
                    <img src="./images/${day.weather}.png">
                    <p>Weather: ${day.weather}</p>
                    <p>Max Temp: ${day.temp2m.max}°C</p>
                    <p>Min Temp: ${day.temp2m.min}°C</p>
                    <p>Max Wind Speed: ${day.wind10m_max} m/s</p>
                </div>
            `;
        });
        weatherInfo.innerHTML = html;
    }

    function formatDate(date) {
        const year = Math.floor(date / 10000);
        const month = Math.floor((date % 10000) / 100);
        const day = date % 100;
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
});