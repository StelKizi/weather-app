if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/:lat/:lon', async (req, res) => {
  try {
    const latitude = req.params.lat;
    const longitude = req.params.lon;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
    const location = await axios.get(url);
    res.json(location.data);
  } catch (error) {
    console.log('Error:', error.message);
  }
})

app.get('/api/:city', async(req, res) =>{
  try {
    const city = req.params.city;
    const url = `http://api.openweathermap.org/data/2.5/weather
    ?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
    const location = await axios.get(url);
    res.json(location.data);    
    console.log('Request:', location.data);
  } catch (error) {
    console.log('Error:', error.message);
  }
})

app.listen(port, () => console.log('Server listening on port ' + port));