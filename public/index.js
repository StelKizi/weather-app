const searchTextArea = document.querySelector('#city-search-input-text');
const searchButton = document.querySelector('#city-search-button');
const output = document.querySelector('.content');


const userLocation = () => {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    
      fetch(`http://localhost:3000/api/${latitude}/${longitude}`)
        .then(res => res.json())
        .then(res => appendWeatherData(res));
    });

  } else {
    /* Geolocation is not available */
    noUserGeolocation();
  }
}


const appendWeatherData = (data) => { 

  /* Extract hours and minutes from unix timestamp for sunrise and sunset */
  let unix_timestamp_sunrise = data.sys.sunrise;
  const date_sunrise = new Date(unix_timestamp_sunrise * 1000);
  const hours_sunrise = date_sunrise.getHours() < 10 ? '0' + date_sunrise.getHours() : date_sunrise.getHours();
  const minutes_sunrise = date_sunrise.getMinutes() < 10 ? '0' + date_sunrise.getMinutes() : date_sunrise.getMinutes();
  const formattedTime_sunrise = `${hours_sunrise}:${minutes_sunrise}`;
  
  let unix_timestamp_sunset = data.sys.sunset;
  const date_sunset = new Date(unix_timestamp_sunset * 1000);
  const hours_sunset = date_sunset.getHours() < 10 ? '0' + date_sunset.getHours() : date_sunset.getHours();
  const minutes_sunset = date_sunset.getMinutes() < 10 ? '0' + date_sunset.getMinutes() : date_sunset.getMinutes();
  const formattedTime_sunset = `${hours_sunset}:${minutes_sunset}`;
  
  output.innerHTML = `
  
    <div class="city-icon-degrees">
      <div class="city-country">${data.name},&nbsp${data.sys.country}</div>
      <div class="icon-degrees">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        <div class="degrees-value">${data.main.temp}&deg</div>
      </div>
    </div>

    <div class="description">${data.weather[0].description}</div>


    <div class="more-data">
      <div class="more-data-cluster-one">
        <div class="feels-like">feels like ${data.main.feels_like}&deg</div>
        <div class="min-max">${data.main.temp_max}&deg/&nbsp${data.main.temp_min}&deg</div>
        <div class="humidity">humidity ${data.main.humidity}%</div>
      </div>

      <div class="more-data-cluster-two">
        <div class="wind">wind ${data.wind.speed} m/s</div>
        <div class="sunrise">sunrise ${formattedTime_sunrise}</div>
        <div class="sunset">sunset ${formattedTime_sunset}</div>
      </div>
    </div>
  `;
}


const noUserGeolocation = () => {
  console.log('Geolocation is not available');
  output.innerHTML = `
  <h2 class="status">Enter a location</h2>
  <h4 class="location">To find the weather</h4>
  <img src="http://openweathermap.org/img/wn/04d@2x.png">
  `;
}


const retrieveWeatherData = () => {
  const cityName = searchTextArea.value;
  if (!cityName) return
  fetch(`http://localhost:3000/api/${cityName}`)
    .then(res => res.json())
    .then(res => appendWeatherData(res))
    .catch(err => console.log('Error:', err));
}


searchTextArea.addEventListener('keyup', e => e.keyCode === 13 ? retrieveWeatherData() : 0);
searchButton.addEventListener('click', retrieveWeatherData);
window.onload = () => userLocation();
