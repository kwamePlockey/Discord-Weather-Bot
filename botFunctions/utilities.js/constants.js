const capitalize = require('./capitalizeString')

const API_LIMIT = {
    DAY_LIMIT_EXCEEDED:"The requested weekday's forecast exceeds the allowed 5 days limit.",
    FORECAST_UNAVAILABLE: (timeOfDay, weekDay) => `API LIMIT!\nSorry, can not return ${capitalize(weekDay)} ${timeOfDay} weather forecast.`,
}

const INVALID_DATA_INPUT = {
    timeOfDay_PARAM: `timeOfDay param accepts the strings ("morning" | "mid_day") or an array of strings`,
    CITY_NOT_FOUND: (cityName) => `City not found: ${cityName} \nPlease check the city name and try again.`,
    INVALID_WEEKDAY: (weekDay) => `Invalid weekday: "${weekDay}". Please check the spelling and try again.`,
}


const forecastString = {
    WEATHER_FORECASTS: (mid_dayForecast, city) => `City: ${city}, \nDate: ${mid_dayForecast.date}, \nTemperature: ${mid_dayForecast.temp} ℃ ,\nWeather: ${capitalize(mid_dayForecast.weatherDescription)}.`,
    DAILY_WEATHER_UPDATES: {
        MORNING: (morningForecast, city) => `Good Morning! \nToday in ${city}: ${morningForecast.temp} ℃, ${capitalize(morningForecast.weatherDescription)}.`,
        MID_DAY: (mid_dayForecast) => `${capitalize(mid_dayForecast.weatherDescription)} in the Afternoon \n_`,
        SUGGESTION: () => ``
    }
}

const subscriptionMessage = {
    DAILY_WEATHER_UPDATES: (city) => `Thanks for subscribing to the Daily Weather Updates Feature! \nYou'll get your daily weather forecast for ${city} at 8:00 AM each morning.`
}

const scheduledTimeForDailyForecastUpdates = {
    seconds: '0',
    minutes: '57',
    hour: '16',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
}

module.exports = {API_LIMIT, INVALID_DATA_INPUT, forecastString, subscriptionMessage, scheduledTimeForDailyForecastUpdates, };