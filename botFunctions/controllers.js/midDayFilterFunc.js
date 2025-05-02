function getMidDayApi(arr){
    return  arr.find(obj => {
        const hourTimeString = new Date(obj.dt_txt).toLocaleTimeString("en-GB", {hour: "2-digit"});
        return (Number(hourTimeString) / 12) === 1;
    })
}

module.exports = {getMidDayApi}