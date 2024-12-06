const dotenv = require("dotenv")
dotenv.config();

const forecastUrl = (cityName) => `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`

module.exports = {forecastUrl}