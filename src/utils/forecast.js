const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=7376cf144510ebe463e56821591c26b1&query='+ encodeURIComponent(latitude)+',' + encodeURIComponent(longitude)

    request({url: weatherUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service.')
        } else if(response.body.error){
            callback('Unable to search co-ordinates.')
        } else {
            callback(undefined,  'Current Temperature is ' +response.body.current.temperature + ' which feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast