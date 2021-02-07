const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=96eb82753a186ba2dd1910331323435f&query=' + longtitude + ',' + latitude;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather forecast service', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees out');
        }
    });
}

module.exports = forecast;