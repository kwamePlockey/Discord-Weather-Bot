const dotenv = require("dotenv")
dotenv.config();
const {fetchForecastApi} = require("./controller.js/fetchUrl");
const {filterWeekDayProps} = require("./controller.js/filterFetchRes");
const {getMidDayApi} = require("./controller.js/midDayFilterFunc")
const {forecastUrl} = require("./controller.js/url")


async function getWeatherForecast(cityName, weekDay){
    try {
            const errorMessage = `Sorry, can not return ${weekDay}'s weather forecast for ${cityName}`

            const url = forecastUrl(cityName)
            const weatherData = await fetchForecastApi(url);
            
            //Filter forecast response for specific weekday 
                const weekDayForecastArray = filterWeekDayProps(weatherData, weekDay);
                if(weekDayForecastArray.length == 0) return errorMessage; 

            //Projecting mid-day forecast as forecast for entire day
                const weekDayForecast = getMidDayApi(weekDayForecastArray);
                console.log(weekDayForecast);

            //Parsing response from weekDayForecast obj;
                //const iconString = weekDayForecast.weather[0].icon;
                //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
                const forecastResponse = `Temperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
                return forecastResponse;

    } catch (error) {
        console.error(error)
        return `${error.message}`
    }
} 


//getWeatherForecast("Tamale", "monday").then(res => console.log(res))  


