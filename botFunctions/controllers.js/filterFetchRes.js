const{API_LIMITS, INVALID_DATA_INPUT} = require('./errorMessages')

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
        throw new Error(API_LIMITS.DAY_LIMITS_EXCEEDED)
    }

    //Filter data for specific weekDay
    const res = data.list.filter(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay();
        return weekDay === daysOfWeek[indexOfWeekDay];
    }) 
    return res;
}
 
module.exports = {filterWeekDayProps}

