const {isUrlValid} = require("./validateUrl")

async function fetchForecastApi(url){
    try {
        if(!isUrlValid(url)) throw new Error `Invalid URL`;
        const res = await fetch(url);
        
        // Error handling for failed fetch response
            if(!res.ok) {
                throw new Error(`Error ${res.status}, ${res.statusText}, ${res.url}`) 
            }
        //Fetching forecast for a particular weekDay from api response
            return await res.json()
         
    } catch(error){
        console.log(error);
        return error.message
    }  
}

module.exports = {fetchForecastApi}

