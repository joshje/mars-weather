var request = require('request');
var config = require('./config');
var weatherIcon = require('./weather-icon');

module.exports = function(req, res) {
  request({
    url: 'http://api.worldweatheronline.com/free/v1/weather.ashx',
    qs: {
      'key': config.worldweatheronline.api_key,
      'date': 'today',
      'cc': 'no',
      'q': req.query.lat+','+req.query.lon,
      'format': 'json',
      'includeLocation': 'yes'
    }
  }, function (error, response, body) {
    var data = JSON.parse(body).data;

    if (! error && !data.error && response.statusCode == 200) {
      var location = data.nearest_area[0].areaName[0].value + ', ' + data.nearest_area[0].country[0].value;
      console.log(data.weather[0]);
      res.json({
        type: 'earth',
        location: location,
        bg: '/api/earth-image?lat=' + req.query.lat + '&lon=' + req.query.lon,
        weather: {
          min_temp: data.weather[0].tempMinC,
          max_temp: data.weather[0].tempMaxC,
          wind_speed: data.weather[0].windspeedKmph || 0,
          wind_direction: data.weather[0].winddirDegree,
          description: data.weather[0].weatherDesc[0].value,
          icon: weatherIcon.byCode(data.weather[0].weatherCode)
        }
      });
    } else {
      res.status(response.statusCode);
      res.send(error || data.error);
    }
  });
};
