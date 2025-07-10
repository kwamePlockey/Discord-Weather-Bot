require('dotenv').config()
const {fetchForecastAPI} = require("./controllers.js/fetchForecastAPI");
const {filterWeekDayProps} = require("./controllers.js/filterFetchRes");
const {getMidDayApi} = require("./controllers.js/midDayFilterFunc");
const {generateForecastUrl} = require("./controllers.js/url");
const {API_LIMITS} = require("./controllers.js/errorMessages");
const {getWeekDay} = require("./controllers.js/generateWeekDay");
const cron = require("node-cron")

//TO DO : PROPER ERROR HANDLING FOR EACH CONTROLLER

async function getWeatherForecast(cityName, weekDay){
    try {

            const url = generateForecastUrl(cityName)
            const weatherData = await fetchForecastAPI(url);
            //Filter forecast response for specific weekday 
                const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay); 

            //Project mid-day forecast as forecast for entire day
                const weekDayForecast = getMidDayApi(weekDayForecastArray);
                if(!weekDayForecast){ 
                    return API_LIMITS.MID_DAY_FORECAST_UNAVAILABLE(weekDay)
                }
                const forecastDate = new Date(weekDayForecast.dt_txt).toDateString();
                const city = weatherData.city.name;

            //Parsing response from weekDayForecast obj(convert to function);
                //const iconString = weekDayForecast.weather[0].icon;
                //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
                const forecastResponse = `City: ${city}, \nDate: ${forecastDate}, \nTemperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
                return forecastResponse;

    } catch (error) {
        console.error(error)
        return `${error.message}` 
    }
} 

//might delete
async function getDailyWeatherUpdates(cityName){
//     try {
//         //Fetch forecast api
//         const url =  generateForecastUrl(cityName);
//         const weatherData = await fetchForecastAPI(url);
        
//         //Generate weekday
//         const weekDay = getWeekDay();
        
//         //Filter forecast response for specific weekday
//         const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay);
//         if(weekDayForecastArray.length == 0) return returnGenErrorMess(cityName, weekDay);

//         //Project mid-day forecast as forecast for entire day;
//          const weekDayForecast = getMidDayApi(weekDayForecastArray);
//          const forecastFormatDate = new Date(weekDayForecast.dt).toDateString();
//         if(!weekDayForecast) return returnGenErrorMess(cityName, weekDay);
//         console.log(weekDayForecast)

//         //Parsing response from weekDayForecast obj;
//                 //const iconString = weekDayForecast.weather[0].icon;
//                 //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
//                 const forecastResponse = `City: ${weekDayForecast.name}, \nDate: ${forecastFormatDate}, \nTemperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
//                 //personalized recommendations;
//                 return forecastResponse;

    
//     } catch (error) {
//         console.log(error.message);
//         return error.message;
//     }
}


// event scheduler: return morning weather updates @ 6:00 am daily
//  cron.schedule(("0 0 6 * * *"), () => {
//      getDailyWeatherUpdates("tamale").then(x => console.log(x))
//  })


 module.exports = {getWeatherForecast, getDailyWeatherUpdates}