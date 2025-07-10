API_LIMITS = {
    DAY_LIMITS_EXCEEDED:"The requested weekday's forecast exceeds the allowed 5 days limit.",
    MID_DAY_FORECAST_UNAVAILABLE: (weekDay) => `API LIMIT!\nSorry, can not return mid-day forecast for ${weekDay}.`,
}

module.exports = {API_LIMITS};