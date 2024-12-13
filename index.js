const dotenv = require("dotenv")
dotenv.config();
const {fetchForecastApi} = require("./controller.js/fetchUrl");
const {filterWeekDayProps} = require("./controller.js/filterFetchRes");
const {getMidDayApi} = require("./controller.js/midDayFilterFunc");
const {forecastUrl} = require("./controller.js/url");
const {returnGenErrorMess} = require("./controller.js/errorMessages");
const {getWeekDay} = require("./controller.js/generateWeekDay");


async function getWeatherForecast(cityName, weekDay){
    try {

            const url = forecastUrl(cityName)
            const weatherData = await fetchForecastApi(url);
            
            //Filter forecast response for specific weekday 
                const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay);
                if(weekDayForecastArray.length == 0) return returnGenErrorMess(cityName, weekDay); 

            //Project mid-day forecast as forecast for entire day
                const weekDayForecast = getMidDayApi(weekDayForecastArray);
                console.log(weekDayForecast);

            //Parsing response from weekDayForecast obj;
                //const iconString = weekDayForecast.weather[0].icon;
                //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
                //include forecast date to response
                const forecastResponse = `Temperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
                return forecastResponse;

    } catch (error) {
        console.error(error)
        return `${error.message}`
    }
} 
//getWeatherForecast("Tamale", "friday").then(res => console.log(res))  





//process with event scheduler
async function getDailyWeatherUpdates(cityName, time){
    try {
        //Fetch forecast api
        const url =  forecastUrl(cityName);
        const weatherData = await fetchForecastApi(url);
        
        //Generate weekday
        const weekDay = getWeekDay();
        
        //Filter forecast response for specific weekday
        const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay);
        if(weekDayForecastArray.length == 0) return returnGenErrorMess(cityName, weekDay);

        //Project mid-day forecast as forecast for entire day;
         const weekDayForecast = getMidDayApi(weekDayForecastArray);
        if(!weekDayForecast) return returnGenErrorMess(cityName, weekDay);
        console.log(weekDayForecast)

        //Parsing response from weekDayForecast obj;
                //const iconString = weekDayForecast.weather[0].icon;
                //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
                //include forecast date to response
                const forecastResponse = `Temperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
                //personalized recommendations;
                return forecastResponse;

    
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

//getDailyWeatherUpdates("tamale").then(x => console.log(x))