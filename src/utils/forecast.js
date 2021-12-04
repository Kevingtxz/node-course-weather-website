const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f881582193bc5c4a35cd0c4952c18f45&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_icon_link: body.current.weather_icons[0],
            })
        }
    })
}

module.exports = forecast