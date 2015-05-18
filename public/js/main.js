require.config({
  paths : {
    text: 'lib/requirejs-hogan-plugin/text',
    hogan: 'lib/requirejs-hogan-plugin/hogan',
    hgn: 'lib/requirejs-hogan-plugin/hgn',
    jquery: 'lib/jquery/dist/jquery',
    templates: '../templates'
  }
});

require([
  'jquery',
  'date',
  'mars-weather',
  'earth-weather'
]);
