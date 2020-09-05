const request = require('request')

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoidml2ZWthZ3Jhd2FsIiwiYSI6ImNrZTZ3cGs1bDAzZnMydnB4aXZ3dGdkdmMifQ.gGGFYv198UqgEzl1u0JKRQ'

    request({url: mapboxUrl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Mapbox Service.')
        } else if(response.body.features.length === 0) {
            callback('Unable to find address. Please try other.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode