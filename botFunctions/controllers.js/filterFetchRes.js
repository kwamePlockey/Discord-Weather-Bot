const{API_LIMIT, INVALID_DATA_INPUT} = require('./constants')
 
//re-factor functions
function filterWeekDayProps(data, weekDay){
    let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    //spell check for weekDay
    if(!daysOfWeek.includes(weekDay)) {
        throw new Error(INVALID_DATA_INPUT.INVALID_WEEKDAY(weekDay));
    }

    //5 DAYS LIMIT CHECK FOR API RESPONSE
    const dataWeekDaysArr = data.list.map(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay();
        return daysOfWeek[indexOfWeekDay]
    })
    if( ! new Set(dataWeekDaysArr).has(weekDay) ) {
        throw new Error(API_LIMIT.DAY_LIMIT_EXCEEDED)
    }

    //Filter data for specific weekDay
    const res = data.list.filter(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay();
        return weekDay === daysOfWeek[indexOfWeekDay];
    }) 
    return res;
}


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


module.exports = {filterWeekDayProps, getTimeOfDayWeatherData}

