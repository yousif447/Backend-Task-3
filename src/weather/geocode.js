const request = require("request")
const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"
    request({url:geocodeURL, json:true}, (error, response) => {
        if(error){
            console.log("error")
            callback("ERROR HAS OCCURED!", undefined)
        }
        else if(response.body.message){
            console.log(response.body.message)
            callback(response.body.message, undefined)
        }
        else if(response.body.features.length == 0){
            callback('No address found',undefined);
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                lattitude: response.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode