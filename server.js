if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));


app.post('/weather', (req, res) => {

})

app.listen(port, () => console.log('Server listening on port ' + port));