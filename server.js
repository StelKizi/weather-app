if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const express = require('express');
const app = express();
const port = 3000;
//const axios = require('axios');
const fetch = require ('node-fetch');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/weather', async (req, res) => {
  const latitude = req.body.lat;
  const longitude = req.body.lon;
  const url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  await axios({
    url: url,
    responseType: 'json'
  }).then(data => res.json(data));
  console.log(req.body)
  .catch(err);  
})


app.listen(port, () => console.log('Server listening on port ' + port));