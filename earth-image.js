var request = require('request');
var Q = require('q');
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

module.exports = function(lat, lon) {
  var deferred = Q.defer();

  request({
    url: 'https://api.flickr.com/services/rest/',
    qs: {
      'method': 'flickr.photos.search',
      'api_key': config.flickr.api_key,
      'lat': lat,
      'lon': lon,
      'format': 'json',
      'nojsoncallback': 1,
      'per_page': 10,
      'media': 'photos',
      'license': '1,2,3,4,5,6,7',
      'sort': 'interestingness-desc',
      'content_type': 1,
      'extras': 'url_h,owner_name'
    }
  }, function (error, response, body) {
    if (! error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var photos = shuffleArray(data.photos.photo);
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        if (photo.url_h) {
          return deferred.resolve({
            url: photo.url_h,
            owner: {
              name: photo.ownername,
              url: 'https://www.flickr.com/photos/'+photo.owner+'/'+photo.id
            }
          });
        }
      }

      deferred.resolve();
    } else {
      return deferred.reject(new Error(error));
    }
  });

  return deferred.promise;
};
