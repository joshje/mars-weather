define([
  'jquery'
], function () {
  var $dateEl = $('.weather-date-details');
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'];

  var today = new Date();
  var year = today.getFullYear().toString();
  var month = months[today.getMonth()];
  var day  = today.getDate().toString();

  $dateEl.html('(' + [day, month, year].join(' ') + ')');
});
