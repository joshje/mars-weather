define([
  'hgn!templates/weather'
], function (
  weatherTmpl
) {
  var renderWeather = function(weatherData) {
    var weatherHtml = weatherTmpl(weatherData);
    var el = document.querySelector('.weather-'+ weatherData.type);
    el.innerHTML = weatherHtml;
  };

  return renderWeather;
});
