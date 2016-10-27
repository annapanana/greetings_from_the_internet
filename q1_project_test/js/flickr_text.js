"use strict";

$(function() {
  var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=38bd8b2ec53acd8812a8d2069711cfd9&user_id=64725727%40N06&per_page=10&page=1&format=json&nojsoncallback=1&auth_token=72157674342124442-e0b7aa6293be6535&api_sig=8893cdadbc7412d51f9684f6271e66c7');

  $xhr.done(function(data) {
    organizePhotoData(data.photos.photo);
  });
});

function organizePhotoData(photos) {
  var photoContainer = $(".container");
  for (var i = 0; i < photos.length; i++) {
    // Documentation for building this string https://www.flickr.com/services/api/misc.urls.html
    var newPhoto = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';


    var newPhoto = $('<img src="' + newPhoto +  '" alt="' + photos[i].title +'">');
    photoContainer.append(newPhoto);
    console.log(photos[i]);
  }
}
