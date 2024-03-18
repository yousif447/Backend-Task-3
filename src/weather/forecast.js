const request = require("request")
const forecast = (longitude, lattitude, callback) => {
    const forecastURL = "https://api.weatherapi.com/v1/current.json?key=31cb26ec2b974f96a2e162923242602&q=" + longitude + ", " + lattitude
    request({url: forecastURL, json:true}, (error, response) => {
        if(error){
            callback("ERROR HAS OCCURED!", undefined)
        }
        else if(response.body.error){
            callback(response.body.error.message, undefined)
        }
        else {
            callback(undefined, {
                city: response.body.location.name,
                weather: response.body.current.condition.text
            })
        }
    })
}

module.exports = forecast