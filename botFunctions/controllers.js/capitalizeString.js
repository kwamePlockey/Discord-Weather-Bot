function capitalize (string) {
    if(typeof string !== 'string'){
        throw new Error ('capitalize function only accepts a string as input parameter') 
    } 
    
    return string.split(" ").map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ')
}


module.exports = capitalize