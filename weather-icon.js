var weatherTypes = {
  'Sunny': [113],
  'PartlyCloudy': [116],
  'Cloudy': [119, 122],
  'Foggy': [143, 248, 260],
  'ScatteredShowers': [176, 185, 263, 293, 299],
  'Rainy': [266, 281, 284, 296, 302, 305, 308, 311, 314, 317, 320, 353, 356, 359, 362, 365],
  'Snowy': [179, 182, 227, 230, 323, 326, 329, 332, 335, 338, 368, 371],
  'Hail': [350, 374, 377],
  'Thundery': [200, 386, 389, 392, 395]
};

var url = function(type) {
  if (! type) return null;

  return '/icons/' + type.toLowerCase() + '.svg';
};

module.exports = {
  byCode: function(code) {
    code = parseInt(code, 10);
    var type;

    for (var key in weatherTypes) {
      if (weatherTypes[key].indexOf(code) !== -1) {
        type = key;
      }
    }

    return url(type);
  },

  url: url
};
