const baseUrl = process.env.OPENWEATHER_BASE_URL;
const apiKey = process.env.OPENWEATHER_API_KEY;


const generateForecastUrl = (cityName) => `${baseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

module.exports = {generateForecastUrl}