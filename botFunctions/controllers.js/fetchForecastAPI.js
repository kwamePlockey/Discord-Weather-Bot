const {generateForecastUrl} = require("./url");
const {isUrlValid} = require("./validateUrl")
const {INVALID_DATA_INPUT} = require('./errorMessages') 

async function fetchForecastAPI(cityName){
    const url = generateForecastUrl(cityName)
    try {
        if(!isUrlValid(url)) throw new Error `Invalid URL`;

        const res = await fetch(url);
        
        // Error handling for failed fetch response
            if(!res.ok) {
                if(res.status = '404'){
                    throw new Error(INVALID_DATA_INPUT.CITY_NOT_FOUND(cityName))
                } else {
                    throw new Error(`Error: ${res.status}, ${res.statusText}, ${res.url}`)
                } 
            }
        //Fetching forecast for a particular weekDay from api response
            return await res.json()
         
    } catch(error){
        throw new Error(error.message)
    }  
}

module.exports = {fetchForecastAPI}

