# Weather App

An app that uses the API from the [OpenWeatherAPI](https://openweathermap.org/current) to display the current weather conditions in the specified city.

The [Geolocation Api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) was also used in combination with OpenWeatherAPI to display the location of the user and present the weather data in the location of the  user.

![app_preview](https://github.com/StelKizi/weather-app/blob/master/images/app_preview.png)

When the geolocation of the user is not available, instead of the weather data of the user's location, the initial page will be as follows:

![app_preview_no_geolocation](https://github.com/StelKizi/weather-app/blob/master/images/app_preview_no_geolocation.png)


# To Run Locally
Clone and run `npm install` in your root directory to install the required dependencies. You will also need to create a `.env` file to save your key from [OpenWeatherAPI](https://openweathermap.org/current), and name it as `OPEN_WEATHER_API_KEY`.
