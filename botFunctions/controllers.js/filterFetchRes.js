const{API_LIMITS} = require('./errorMessages')

function filterWeekDayProps(data, weekDay){
    weekDay = weekDay.toLowerCase() //weekDay string formatting 
    let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    //5 DAYS LIMIT CHECK FOR API RESPONSE
    const dataWeekDaysArr = data.list.map(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay();
        return daysOfWeek[indexOfWeekDay]
    })
    if( ! new Set(dataWeekDaysArr).has(weekDay) ) {
        throw new Error(API_LIMITS.DAY_LIMITS_EXCEEDED)
    }

    //
    const res = data.list.filter(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay();
        return weekDay === daysOfWeek[indexOfWeekDay];
    }) 
    return res;
}
 
module.exports = {filterWeekDayProps}

