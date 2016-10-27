"use strict";

$(function() {
  $('#search_button').on('click', function() {
    searchFlickr($('#search_criteria').val());
  });

  // var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=38bd8b2ec53acd8812a8d2069711cfd9&text=boulder&safe_search=&per_page=10&page=1&format=json&nojsoncallback=1&auth_token=72157674342124442-e0b7aa6293be6535&api_sig=ba7bf20c1fac7280ce3af9c910e31e31');


});

function searchFlickr(keyword) {
  // https://www.flickr.com/services/api/flickr.photos.search.html
  var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8dab8502838fc3c0fe9aa97fd57f23b2&tags='+keyword+'&safe_search=true&has_geo=true&content_type=1&per_page=30&page=1&format=json&nojsoncallback=1');
  $xhr.done(function(data) {
    organizePhotoData(data.photos.photo);
  });
}

function organizePhotoData(photos) {
  var photoContainer = $(".container");

  // Clear image container
  $(photoContainer.children().remove());

  // Fill image container with new search results
  for (var i = 0; i < photos.length; i++) {
    // Documentation for building this string https://www.flickr.com/services/api/misc.urls.html
    var photoSource = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';

    // TODO filter for size and aspect ratio

    var newPhoto = $('<img src="' + photoSource +  '" alt="' + photos[i].title +'" class="photo_option">');
    photoContainer.append(newPhoto);

  }

  // Add an event listener to each photo
  $('.photo_option').on('click', function(event) {
    selectPhoto(event.target)
  });
}

function selectPhoto(selection) {
  console.log(selection);
  
}
