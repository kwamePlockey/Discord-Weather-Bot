function filterWeekDayProps(data, weekDay){
    return data.list.filter(obj => {
        let indexOfDay = new Date(obj.dt_txt).getDay()

        let daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        return daysOfWeek[indexOfDay] === weekDay.toLowerCase();
    }) 

}

module.exports = {filterWeekDayProps}