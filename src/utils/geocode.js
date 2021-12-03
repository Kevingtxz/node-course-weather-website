const request = require('request')

const geocode = (address_search, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address_search) +'.json?access_token=pk.eyJ1Ijoia2V2aW5ndHh6IiwiYSI6ImNrd2p5anZtbDFtejUzM25vZ3Rhb2EwcHYifQ.5rQZPaEwPyznWpBH4gAOXQ&limit=1'
    request({ url, json: true}, (error, { body }) => {

        if (error) 
            callback('Unable to connect to location services!', undefined)
        else if(body.message === 'Not Found') 
            callback('Unable to find location. Try another search.', undefined)
        else 
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
    })
}

module.exports = geocode