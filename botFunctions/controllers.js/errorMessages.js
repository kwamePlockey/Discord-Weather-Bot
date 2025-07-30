API_LIMITS = {
    DAY_LIMITS_EXCEEDED:"The requested weekday's forecast exceeds the allowed 5 days limit.",
    MID_DAY_FORECAST_UNAVAILABLE: (weekDay) => `API LIMIT!\nSorry, can not return mid-day forecast for ${weekDay}.`,
}

INVALID_DATA_INPUT = {
    CITY_NOT_FOUND: (cityName) => `City not found: ${cityName}. Please check the city name and try again.`,
    INVALID_WEEKDAY: (weekDay) => `Invalid weekday: "${weekDay}". Please check the spelling and try again.`,
}

module.exports = {API_LIMITS, INVALID_DATA_INPUT};