var express = require('express');
var config = require('./config');
var marsWeather = require('./mars-weather');
var earthWeather = require('./earth-weather');

var app = express();

app.get('/api/mars', marsWeather);
app.get('/api/earth', earthWeather);

app.use('/js/lib', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

var server = app.listen(config.port || 3000, function () {
  console.log('Server listening on port %d', server.address().port);
});
