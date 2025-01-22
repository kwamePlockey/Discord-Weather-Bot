const {isUrlValid} = require("./validateUrl")

async function fetchForecastApi(url){
    try {
        if(!isUrlValid(url)) return `Invalid URL`;
        const res = await fetch(url);
        
        // Error handling for failed fetch response
            if(!res.ok) {
            return `Error ${res.status}, ${res.statusText}, ${res.url}`
            }
        //Fetching forecast for a particular weekDay from api response
            return await res.json()
         
    } catch(error){
        console.log(error);
        return error.message
    }
        
}

module.exports = {fetchForecastApi}

