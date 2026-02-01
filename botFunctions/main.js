require('dotenv').config()
const fetchForecastAPI = require("./controllers.js/fetchForecastAPI");
const {filterWeekDayProps, getTimeOfDayWeatherData} = require("./controllers.js/filterFetchRes");
const {API_LIMIT, forecastString} = require("./controllers.js/constants");
const {getWeekDay} = require("./controllers.js/generateWeekDay");
const getForecastDetails = require('./controllers.js/getForecastDetails');


async function getWeatherForecast(cityName, weekDay){
    try {
        const weatherData = await fetchForecastAPI(cityName);
        //Filter forecast response for specific weekday 
            const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay); 

        //Project mid-day forecast as forecast for entire day
            const timeOfDay = 'mid_day';
            const res = getTimeOfDayWeatherData(timeOfDay, weekDayForecastArray);
            const weekDayForecast = res.mid_day;
            if(!weekDayForecast){ 
                return API_LIMIT.FORECAST_UNAVAILABLE(timeOfDay, weekDay)
            }
            
        //Parsing response from weekDayForecast obj;
            const city = weatherData.city.name;
            const forecastDetails = getForecastDetails(weekDayForecast);
            const response = forecastString.WEATHER_FORECASTS(forecastDetails, city);
            return response

    } catch (error) {
        throw (error) 
    }
} 


async function getDailyWeatherUpdates(cityName){
    try {
        const timeOfDay = ['morning', 'mid_day'];
        const weatherData = await fetchForecastAPI(cityName);
        
        const weekDay = getWeekDay();
        
        //Filter forecast response for specific weekday
        const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay);
        
        //Return weatherData for morning & mid_day time periods 
        const res = getTimeOfDayWeatherData(timeOfDay, weekDayForecastArray);

        const{morning, mid_day} = res;
        if(!morning) return API_LIMIT.FORECAST_UNAVAILABLE(morning, weekDay);
        if(!mid_day) return API_LIMIT.FORECAST_UNAVAILABLE(mid_day, weekDay);

        //Parsing response from getTimeOfDayWeatherData func;
        const city = weatherData.city.name;
        const morningWeather = getForecastDetails(morning);
        const mid_dayWeather = getForecastDetails(mid_day);
        const morningWeatherString = forecastString.DAILY_WEATHER_UPDATES.MORNING(morningWeather, city);
        const mid_dayWeatherString = forecastString.DAILY_WEATHER_UPDATES.MORNING(mid_dayWeather);
        //(suggestion)
        const response = `${morningWeatherString}\n${mid_dayWeatherString}`;
        return response
        
    } catch (error) {
        throw (error)
    }
}





 module.exports = {getWeatherForecast, getDailyWeatherUpdates}