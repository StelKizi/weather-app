const searchTextArea = document.querySelector('#city-search-input-text');
const searchButton = document.querySelector('#city-search-button');
const output = document.querySelector('.container');

const userLocation = () => {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const info = {latitude, longitude};

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Accept': 'application/json'
        },
        body: JSON.stringify(info),
      };
    
      fetch('http://localhost:3000/api', options)
      .then(res => res.json())
      .then(res => appendWeatherData(res));
      /* .then(res => appendWeatherData(res)); */
    });
  } else {
    /* Geolocation is not available */
    console.log('Geolocation is not available');
    
  }
}

const appendWeatherData = (data) => {
  output.innerHTML = `${data.name}`;
}

const retrieveWeatherData = () => {
  const cityName = searchTextArea.value;
  if (!cityName) return
  fetch(`http://localhost:3000/api/${cityName}`)
    .then(res => res.json())
    .then(res => appendWeatherData(res));
}

searchTextArea.addEventListener('keyup', e => e.code === 'Space' ? retrieveWeatherData() : '');
searchButton.addEventListener('click', retrieveWeatherData());
window.onload = () => userLocation();
