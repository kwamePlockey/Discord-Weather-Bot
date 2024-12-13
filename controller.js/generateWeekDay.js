function getWeekDay(){
    const indexOfWeekDay = new Date().getDay();
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const weekDay = daysOfWeek[indexOfWeekDay]
    return weekDay; 
}

module.exports = {getWeekDay};