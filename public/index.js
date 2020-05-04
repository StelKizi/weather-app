const searchTextArea = document.querySelector('#city-search-input-text');
const searchButton = document.querySelector('#city-search-button');

const userLocation = () => {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude
        })
      };
    
      const res = await fetch('http://localhost:3000/weather', options);
      const data = await res.json();
      console.log(data);      
    });
  } else {
    console.log('geolocation IS NOT available');
  }
}

const retrieveData = () => {
  const place = searchTextArea.value;
  if (!place) return
}

searchTextArea.addEventListener('keyup', e => e.code === 'Space' ? retrieveData() : '');

window.onload = () => {
  userLocation();
};