function isUrlValid(url){
    try {
        const res = new URL(url);
        return true
    } catch (error) {
        return false
    }
}

module.exports = {isUrlValid};