const getForecastDetails = (weatherParameters) => {
    const forecastDetails = {};

    forecastDetails.date =  new Date(weatherParameters.dt_txt).toDateString();
    forecastDetails.temp = weatherParameters.main.temp;
    forecastDetails.weatherDescription = weatherParameters.weather[0].description;

    return forecastDetails;
}













module.exports = getForecastDetails;