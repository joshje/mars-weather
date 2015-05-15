define([
  'render-weather'
], function (
  renderWeather
) {
  $.ajax('/api/mars')
  .then(function(data) {
    renderWeather(data);
  });

});
