"use strict";

var photoManager;

$(function() {
  $('#search_button').on('click', function() {
    searchFlickr($('#search_criteria').val());
  });
});

function searchFlickr(keyword) {
  // https://www.flickr.com/services/api/flickr.photos.search.html

  var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=895b279df6ecc35b1e91b50a62dd8d4f&tags='+keyword+'&safe_search=true&has_geo=true&content_type=1&per_page=30&page=1&format=json&nojsoncallback=1');
  $xhr.done(function(data) {
    organizePhotoData(data.photos.photo, keyword);
  });
}

function organizePhotoData(photos, keyword) {
  var photoCollection = {}; // This only holds the photo name and URL
  var photoData = {}; // A temporary object to hold ALL data from Flickr

  // Fill image container with new search results
  for (var i = 0; i < photos.length; i++) {
    // Documentation for building this string https://www.flickr.com/services/api/misc.urls.html
    var photoSource = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';

    // Build an HTML photo element
    var newPhoto = $('<img src="' + photoSource +  '" alt="' + photos[i].title +'" class="photo_option" name="'+ "p_" + photos[i].id + '">');

    // Add this new photo to the temp object
    var keyString = "p_" + photos[i].id;
    photoData[keyString] = newPhoto;

    // Push only the SCR data for this key to the main photo collection object
    photoCollection[keyString] = photoData[keyString][0].src;
  }

  // initialize photo manager and pass it all of the photos pulled from flickr
  photoManager = setPhotos(photoCollection, keyword);
  // Add an event listener to each photo to see if the user will select it
  $('.photo_option').on('click', function() {
    photoManager.checkPhotoStatus(event.target);
  });
}

function setPhotos(allPhotos, text) {
  var selectedPhotos = [];
  var currentPhotoCount = 0;
  var photoCollection = allPhotos;
  var numOfLetters = 0;

  // Visually organize photo
  photoLayout(allPhotos);

  // Set and initialize header text
  var searchText = text;
  var headerManager = headerData(searchText);
  headerManager.updateHeaderText(selectedPhotos.length);
  headerManager.initializeHeader();
  numOfLetters = headerManager.getTotalLetterCount();

  return {
    // Add a photo to the collection
    addPhoto: function(selection) {
      // Get the name of the target element to reference in the main photo collection object
      var keyOfSelected = $(selection).attr("name"); // this is p_[image ID from flickr]
      console.log("adding photo " + keyOfSelected);
      selectedPhotos.push(keyOfSelected);
      // TODO change the state of the photo
      headerManager.updateHeaderText(selectedPhotos.length);
      currentPhotoCount++;
    },
    // Remove a photo from the collection
    removePhoto: function(selection) {
      var keyOfSelected = $(selection).attr("name"); // this is p_[image ID from flickr]
      console.log("removing photo " + keyOfSelected);
      var index = selectedPhotos.indexOf(keyOfSelected);
      selectedPhotos.splice(index, 1);
      console.log(selectedPhotos);
      // TODO change the state of the photo
      headerManager.updateHeaderText(selectedPhotos.length);
      currentPhotoCount--;
    },
    // Check to see if the user has selected enough photos
    submitPhotos: function() {
      for (var i = 0; i < selectedPhotos.length; i++) {
        var keyName = "image_selection" + i;
        // store the photo object in local storage
        localStorage.setItem(keyName, JSON.stringify(photoCollection[selectedPhotos[i]]));
        localStorage.setItem("text", JSON.stringify(searchText));
        // load canvas page and initialize in canvas_composition.js
        location.assign("composition.html");
      }
    },
    checkPhotoStatus: function(selection) {
      // If the photo is selected, remove if not add it
      if (selectedPhotos.length > 0) {
        var tempPhotoArray = [];
        for (var i = 0; i < selectedPhotos.length; i++) {
          tempPhotoArray.push(selectedPhotos[i]);
        }
        for (var j = 0; j < tempPhotoArray.length; j++) {
          if (tempPhotoArray[j] === $(selection).attr("name")) {
            photoManager.removePhoto(selection);
            return;
          } else {
            photoManager.addPhoto(selection);
          }
        }
      } else {
        photoManager.addPhoto(selection);
      }
      console.log(currentPhotoCount + " " + numOfLetters);
      if (currentPhotoCount === numOfLetters) {
        // TODO enable submit button
        // TODO prevent the user from adding a photo
        console.log("number reached");
        photoManager.submitPhotos();
      }
    }
  };
}

function headerData(text) {
  var letterCount = 0;
  var searchText = text;

  return {
    initializeHeader: function() {
      for (var i = 0; i < searchText.length; i++) {
        letterCount+=1;
      }
    },
    getTotalLetterCount: function() { // not currently being used
      return letterCount;
    },
    getRemainingLetterCount: function(numOfSelectedPhotos) { // not currently being used
      return letterCount - numOfSelectedPhotos;
    },
    updateHeaderText: function(numOfSelectedPhotos) {
      $("#image_number").text("Select "+ (letterCount - numOfSelectedPhotos) + " photos");
    }
  };
}

function photoLayout(photos) {
  var cardColumns = $("#card_columns").children();
  var columnCounter = 0;

  // // Clear columns
  // for (var i = 0; i < cardColumns.length; i++) {
  //   console.log($(cardColumns[i].children()));
  //   // $(cardColumns[i].remove(cardColumns[i]).children());
  // }
  // Populate each column with new photos
  for (let key in photos) {
    var newDiv = '<div class="card"><div class="card-image"><img src="'+photos[key]+'"/></div></div>';
    $(newDiv).appendTo(cardColumns[columnCounter]);
    columnCounter++;
    if (columnCounter === cardColumns.length) {
      columnCounter = 0;
    }
  }
}
