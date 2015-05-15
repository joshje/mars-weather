define([
  'render-weather'
], function (
  renderWeather
) {
  $.ajax('http://mars.joshemerson.co.uk/api/mars')
  .then(function(data) {
    renderWeather(data);
  });

});
