var request = require('request');
var weatherIcon = require('./weather-icon');

module.exports = function(req, res) {
  request('http://marsweather.ingenology.com/v1/latest/', function (error, response, body) {
    res.header('Access-Control-Allow-Origin', 'http://joshje.github.io');
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var wind_speed = data.report.wind_speed || 0;
      var wind_direction = wind_speed ? data.report.wind_direction : 0;
      res.json({
        type: 'mars',
        location: 'Mars',
        weather: {
          min_temp: data.report.min_temp,
          max_temp: data.report.max_temp,
          wind_speed: wind_speed,
          wind_direction: wind_direction,
          description: data.report.atmo_opacity,
          icon: weatherIcon.url(data.report.atmo_opacity)
        }
      });
    } else {
      res.status(response.statusCode);
      res.send(error);
    }
  });
};
