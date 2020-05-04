if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
  const data = req.body;
  res.json({
    status: 'success',
    latitude: data.latitude,
    longitude: data.longitude
  })
  res.json();
})

app.listen(port, () => console.log('Server listening on port ' + port));