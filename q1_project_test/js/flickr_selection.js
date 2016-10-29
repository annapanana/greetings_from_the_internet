"use strict";

var photoCollection = {} // photo ID as key, flickr path as value

$(function() {
  $('#search_button').on('click', function() {
    searchFlickr($('#search_criteria').val());
  });

  // var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=38bd8b2ec53acd8812a8d2069711cfd9&text=boulder&safe_search=&per_page=10&page=1&format=json&nojsoncallback=1&auth_token=72157674342124442-e0b7aa6293be6535&api_sig=ba7bf20c1fac7280ce3af9c910e31e31');

});

function searchFlickr(keyword) {
  // https://www.flickr.com/services/api/flickr.photos.search.html
  
  var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=895b279df6ecc35b1e91b50a62dd8d4f&tags='+keyword+'&safe_search=true&has_geo=true&content_type=1&per_page=30&page=1&format=json&nojsoncallback=1');
  $xhr.done(function(data) {
    console.log(data);
    organizePhotoData(data.photos.photo);
  });
}

function organizePhotoData(photos) {
  var photoContainer = $(".container");

  var photoData = {}; // A temporary object to hold ALL data from Flickr
  // Clear image container
  $(photoContainer.children().remove());
  // Fill image container with new search results
  for (var i = 0; i < photos.length; i++) {
    // Documentation for building this string https://www.flickr.com/services/api/misc.urls.html
    var photoSource = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';

    // Build an HTML photo element
    var newPhoto = $('<img src="' + photoSource +  '" alt="' + photos[i].title +'" class="photo_option" name="'+ "p_" + photos[i].id + '">');
    photoContainer.append(newPhoto);

    // Add this new photo to the temp object
    var keyString = "p_" + photos[i].id;
    photoData[keyString] = newPhoto;

    // Push only the SCR data for this key to the main photo collection object
    photoCollection[keyString] = photoData[keyString][0].src;
  }

  // Add an event listener to each photo to see if the user will select it
  $('.photo_option').on('click', function() {
    selectPhoto(event.target)
  });
}

function selectPhoto(selection) {

  // Get the name of the target element to reference in the main photo collection object
  var keyOfSelected = $(selection).attr("name");

  // store the photo object in local storage
  localStorage.setItem("image_selection", JSON.stringify(photoCollection[keyOfSelected]));

  // load canvas page and initialize in canvas_composition.js
  location.assign("composition.html");
}
