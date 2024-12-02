const dotenv = require("dotenv")
dotenv.config();


//const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=metric`

//const urlForecastWeather = `api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_Key}&units=metric`


async function weatherForecast(cityName, weekDay){
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        const res = await fetch(url)
        const errorMessage = `Sorry, can not return ${weekDay}'s weather forecast for ${cityName}`
        
        // Error handling for failed fetch response
            if(!res.ok) {
            return `Error ${res.status}, ${res.statusText}`
            }
        //Fetching forecast for a particular weekDay from api response
            let weatherData = await res.json()
            const weekDayForecastArray = weatherData.list.filter(obj => {
                let indexOfDay = new Date(obj.dt_txt).getDay()

                let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
                return daysOfWeek[indexOfDay] === weekDay.toLowerCase();
            }) 
        
            if(weekDayForecastArray.length === 0) return errorMessage;

        //Projecting mid-day forecast as forecast for entire day
           const weekDayForecast = weekDayForecastArray.find(obj => {
                const hourTimeString = new Date(obj.dt_txt).toLocaleTimeString("en-GB", {hour: "2-digit"});
                return (Number(hourTimeString) / 12) === 1;
            })
    
            console.log(weekDayForecast);
        
        //Parsing response from weekDayForecast obj;
            const iconString = weekDayForecast.weather[0].icon;
            //const iconURL = `https://openweathermap.org/img/wn/${iconString}.png`(To be handled with Discord.js package)
            const forecastResponse = `Temperature: ${weekDayForecast.main.temp} ℃ ,\nWeather: ${weekDayForecast.weather[0].description}.`;
            return forecastResponse;

    } catch (error) {
        console.error(error)
        return `${error.message}`
    }
} 






//weatherForecast("Tamale", "monday").then(res => console.log(res)) 