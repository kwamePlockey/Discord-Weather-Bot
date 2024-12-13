function filterWeekDayProps(data, weekDay){
    const res = data.list.filter(obj => {
        let indexOfWeekDay = new Date(obj.dt_txt).getDay()

        let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        return daysOfWeek[indexOfWeekDay] === weekDay.toLowerCase();
    }) 
    return res;
}

module.exports = {filterWeekDayProps}