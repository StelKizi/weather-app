if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/:lat/:lon', async (req, res) => {
  const latitude = req.body.lat;
  const longitude = req.body.lon;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const location = await axios.get(url);
    const data = await location.json();
    res.json(data);
  } catch (error) {
    console.log('Error:', error.message);
  }
  console.log(req.body);  
})

app.listen(port, () => console.log('Server listening on port ' + port));