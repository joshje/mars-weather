define([
  'render-weather'
], function (
  renderWeather
) {
  if (! navigator.geolocation) return;

  var getWeather = function(pos) {
    var lat = pos.coords.latitude.toFixed(4),
        lon = pos.coords.longitude.toFixed(4);

    $.ajax('/api/earth?lat=' + lat + '&lon=' + lon)
    .then(function(data) {
      renderWeather(data);
    });
  };

  var onLocationError = function(err) {
    console.log(err);
  };

  navigator.geolocation.getCurrentPosition(getWeather, onLocationError);
});
