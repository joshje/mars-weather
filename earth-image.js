var request = require('request');
var config = require('./config');

var shuffleArray = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

module.exports = function(req, res) {
  request({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      'method': 'flickr.photos.search',
      'api_key': config.flickr.api_key,
      'lat': req.query.lat,
      'lon': req.query.lon,
      'format': 'json',
      'nojsoncallback': 1,
      'per_page': 10,
      'media': 'photos',
      'license': '1,2,3,4,5,6,7',
      'sort': 'interestingness-desc',
      'content_type': 1,
      'extras': 'url_h'
    }
  }, function (error, response, body) {
    if (! error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var photos = shuffleArray(data.photos.photo);
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        if (photo.url_h) {
          res.redirect(photo.url_h);
          return;
        }
      }
    } else {
      res.status(response.statusCode);
      res.send(error);
    }
  });
};
