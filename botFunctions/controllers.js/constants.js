API_LIMIT = {
    DAY_LIMIT_EXCEEDED:"The requested weekday's forecast exceeds the allowed 5 days limit.",
    FORECAST_UNAVAILABLE: (timeOfDay, weekDay) => `API LIMIT!\nSorry, can not return ${timeOfDay} forecast for ${weekDay}.`,
}

INVALID_DATA_INPUT = {
    timeOfDay_PARAM: `timeOfDay param accepts the strings ("morning" | "mid_day") or an array of strings`,
    CITY_NOT_FOUND: (cityName) => `City not found: ${cityName}. Please check the city name and try again.`,
    INVALID_WEEKDAY: (weekDay) => `Invalid weekday: "${weekDay}". Please check the spelling and try again.`,
}

module.exports = {API_LIMIT, INVALID_DATA_INPUT};