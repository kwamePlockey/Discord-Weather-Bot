function returnGenErrorMess(cityName, weekDay){
    const errorMessage = `Sorry, can not get ${weekDay}'s weather update for ${cityName}`
    return errorMessage;
}

module.exports = {returnGenErrorMess};