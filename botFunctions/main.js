require('dotenv').config()
const {fetchForecastAPI} = require("./controllers.js/fetchForecastAPI");
const {filterWeekDayProps} = require("./controllers.js/filterFetchRes");
const {API_LIMIT} = require("./controllers.js/errorMessages");
const {getWeekDay} = require("./controllers.js/generateWeekDay");
const getTimeOfDayWeatherData = require("./controllers.js/timeOfDayFilterFunc");
const getForecastDetails = require('./controllers.js/getForecastDetails');
const cron = require("node-cron")


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
            const {date, temp, weatherDescription} = getForecastDetails(weekDayForecast);
            const forecastResponse = `City: ${city}, \nDate: ${date}, \nTemperature: ${temp} ℃ ,\nWeather: ${weatherDescription}.`;
            return forecastResponse;

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
        const morningWeatherForecast = getForecastDetails(morning);
        const mid_dayWeatherForecast = getForecastDetails(mid_day);
        const forecastResponse = `Good morning! Today in ${city}: ${morningWeatherForecast.temp}, ${morningWeatherForecast.weatherDescription}. \n ${mid_dayWeatherForecast.weatherDescription} - ${suggestions}`

    } catch (error) {
        throw (error)
    }
}


// event scheduler: return morning weather updates @ 6:00 am daily
//  cron.schedule(("0 0 6 * * *"), () => {
//      getDailyWeatherUpdates("tamale").then(x => console.log(x))
//  })


 module.exports = {getWeatherForecast, getDailyWeatherUpdates}