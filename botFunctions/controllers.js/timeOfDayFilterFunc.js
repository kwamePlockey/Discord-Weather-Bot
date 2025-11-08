const {INVALID_DATA_INPUT} = require('./errorMessages')

function getTimeOfDayWeatherData(timeOfDay, weatherArr){

    if(!Array.isArray(timeOfDay) && typeof timeOfDay !== 'string'){
        throw new Error(INVALID_DATA_INPUT.timeOfDay_PARAM)
    }

    const clientRequestedDayPeriod = []

    const dayAndCorrespondingTimePeriods = {
        morning: 9,
        mid_day: 12,
    }

    const dayPeriods = Object.keys(dayAndCorrespondingTimePeriods)

    if(Array.isArray(timeOfDay)){
        timeOfDay.forEach((dayPeriod) => {
            dayPeriod = dayPeriod.toString().toLowerCase().trim()
            if(dayPeriods.includes(dayPeriod)) clientRequestedDayPeriod.push(dayPeriod)
        })
    }else if(typeof timeOfDay === 'string'){
        timeOfDay = timeOfDay.toLowerCase().trim()
        if(dayPeriods.includes(timeOfDay)) clientRequestedDayPeriod.push(timeOfDay)
    }
    
    const res = {}

    clientRequestedDayPeriod.forEach(dayPeriod => {

        const requestedWeatherData = weatherArr.find(weatherData => {
            const extractedHourTimeString = new Date(weatherData.dt_txt).toLocaleTimeString("en-GB", {hour: "2-digit"})
            const clientRequestedHourTime = dayAndCorrespondingTimePeriods[dayPeriod]

            return Number(extractedHourTimeString) === clientRequestedHourTime 
        })
        
        res[dayPeriod] = requestedWeatherData
    })

    return res  
}

module.exports = getTimeOfDayWeatherData