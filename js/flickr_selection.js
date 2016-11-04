"use strict";

var photoManager;
var messageText = "";
var currentPhotoCount = 0;
var selectedPhotos = [];

$(function() {
  $("#info-box").hide();
  var cardObject = localStorage.getItem("postcardTemplate");
  cardObject = JSON.parse(cardObject);
  messageText = cardObject.text;

  // Set greetings text in hidden info box
  $('#search_button').on('click', function() {
    showInfoBox(messageText);
    searchFlickr($('#search_criteria').val(), 1);
    saveCardObject(cardObject);
  });

  // Search flickr by selected enter key
  $("input").keypress(function(e) {
    if (e.keyCode == 13) {
      searchFlickr($('#search_criteria').val(), 1);
      showInfoBox(messageText);
      saveCardObject(cardObject);
    }
  });
});

function showInfoBox(messageText) {
  $("#info-box").show();
  for (var i = 0; i < messageText.length; i++) {
    $("#greentings-text").append("<a><b>"+messageText[i]+"</a></b>")
  }
}

function saveCardObject(cardObject) {
  // save the search text to the postcard template object in local storage
  cardObject.searchText = $('#search_criteria').val();
  localStorage.setItem("postcardTemplate", JSON.stringify(cardObject));
}

function searchFlickr(searchText, page) {
  // https://www.flickr.com/services/api/flickr.photos.search.html

  var $xhr = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=895b279df6ecc35b1e91b50a62dd8d4f&tags='+searchText+'&safe_search=true&has_geo=true&content_type=1&per_page=30&page=' + page + '&format=json&nojsoncallback=1');
  $xhr.done(function(data) {
    organizePhotoData(data.photos.photo, searchText);
  });
}

function organizePhotoData(photos, searchText) {
  var photoCollection = {}; // This only holds the photo name and URL
  var photoData = {}; // A temporary object to hold ALL data from Flickr

  var photosList = [];
  for (var i = 0; i < photos.length; i++) {
    photosList.push($.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=895b279df6ecc35b1e91b50a62dd8d4f&photo_id='+photos[i].id+'&format=json&nojsoncallback=1'));
  }

  Promise.all(photosList).then(function (data) {
    for (var i = 0; i < photos.length; i++) {
      // Documentation for building this string https://www.flickr.com/services/api/misc.urls.html
      var photoSource = data[i]["sizes"]["size"][1]["source"];
      // Build an HTML photo element
      var newPhoto = $('<img src="' + photoSource +  '" alt="' + photos[i].title +'" class="photo_option" name="'+ "p_" + photos[i].id + '">');

      // Add this new photo to the temp object
      var keyString = "p_" + photos[i].id;
      photoData[keyString] = newPhoto;

      // Push only the SCR data for this key to the main photo collection object
      photoCollection[keyString] = photoData[keyString][0].src;
    }

    // GETS CALLED ONCE ON CALLBACK
    // initialize photo manager and pass it all of the photos pulled from flickr
    photoManager = setPhotos(photoCollection, searchText);

    // Add an event listener to each photo to see if the user will select it
    $('.photo-option').on('click', function() {
      photoManager.checkPhotoStatus(event.target);
    });
    //custom animation on images
    $(".photo-option").mouseenter(function() {
      TweenMax.to($(this), .2, {css:{scaleX:1.1, scaleY:1.1}});
    });
    $(".photo-option").mouseleave(function() {
      TweenMax.to($(this), .2, {css:{scaleX:1, scaleY:1}});
    });
  })

  $('#refresh_button').on('click', function() {
    photoManager.refreshPhotos();
  });

  $('#done_button').on('click', function() {
    photoManager.checkSubmit();
  })

}

function setPhotos(allPhotos, text) {
  var photoCollection = allPhotos;
  var numOfLetters = 0;
  var currentPage = 1;
  console.log("in set photos " + currentPhotoCount);
  // Visually organize photo
  photoLayout(allPhotos);

  // Set and initialize header text
  var searchText = text;
  var headerManager = headerData(searchText); //
  headerManager.initializeHeader();
  numOfLetters = headerManager.getTotalLetterCount();
  headerManager.updateHeaderText(selectedPhotos.length);

  // Reset greeting text in info box
  for (var i = 0; i < numOfLetters.length; i++) {
    $("#greentings-text").children("a:nth-child("+(i+1)+")").css("color", "black");
  }

  return {
    // Add a photo to the collection
    addPhoto: function(selection) {
      // Get the name of the target element to reference in the main photo collection object
      var keyOfSelected = $(selection).attr("name"); // this is p_[image ID from flickr]
      selectedPhotos.push(keyOfSelected);
      // change the state of the photo
      $(selection).toggleClass("selected-photo");
      headerManager.updateHeaderText(selectedPhotos.length);
      currentPhotoCount++;
    },
    // Remove a photo from the collection
    removePhoto: function(selection) {
      var keyOfSelected = $(selection).attr("name"); // this is p_[image ID from flickr]
      var index = selectedPhotos.indexOf(keyOfSelected);
      selectedPhotos.splice(index, 1);
      // Change the state of the photo
      $(selection).toggleClass("selected-photo");
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
      // BUG if the queue is full, the user wont be able to remove images because this first condition will return true
      if (currentPhotoCount === numOfLetters) {
        // enable submit button
        $("#done_button").removeClass("disabled");
        $('.toast').remove();
        Materialize.toast("Please select done button :)");
      } else {
        $("#done_button").addClass("disabled");
        // If the photo is selected, remove if not add it
        if ($(selection).hasClass("selected-photo")) {
          photoManager.removePhoto(selection);
        } else {
          photoManager.addPhoto(selection);
        }

        // If this is the last photo for the queue, trigger photo-filled functionality
        if (currentPhotoCount === numOfLetters) {
          photoManager.checkPhotoStatus();
        }
      }
    },
    checkSubmit: function() {
      if (currentPhotoCount === numOfLetters) {
        photoManager.submitPhotos();
      }
    },
    refreshPhotos: function() {
      currentPage++;
      searchFlickr(searchText, currentPage);
    }
  };
}

function headerData() {
  var letterCount = 0;
  var childNum = 0;
  // var searchText = text;
  // console.log(text);
  return {
    initializeHeader: function() {
      for (let i = 0; i < messageText.length; i++) {
        if (messageText[i] !== " "){
          letterCount+=1;
        }
      }
    },
    getTotalLetterCount: function() { // not currently being used
      return letterCount;
    },
    getRemainingLetterCount: function(numOfSelectedPhotos) { // not currently being used
      return letterCount - numOfSelectedPhotos;
    },
    updateHeaderText: function(numOfSelectedPhotos) {
      console.log("update header text");
      $("#photo-count-text").text("Select "+ (letterCount - numOfSelectedPhotos) + " more photos");
      // Update color of greeting text as user selects more photos
      // Account for words with spaces / child num is defined at the top of func
      if (messageText[numOfSelectedPhotos-1] === " ") {
        childNum = 1;
      }
      console.log(numOfSelectedPhotos);
      $("#greentings-text").children("a:nth-child("+(numOfSelectedPhotos+childNum)+")").css("color", "red");
    },
   };
}

function photoLayout(photos) {
  $(".photo-column").empty();
  var cardColumns = $(".photo-column");
  var columnCounter = 0;

  // Populate each column with new photos
  for (let key in photos) {
    var newDiv = '<div class="card"><div class="card-image photo-option"><img name="'+key+'" src="'+photos[key]+'"/></div></div>';
    $(newDiv).appendTo(cardColumns[columnCounter]);
    columnCounter++;
    if (columnCounter === cardColumns.length) {
      columnCounter = 0;
    }
  }
  // TODO enable lazy load for materialize cards
  // $(".lazy").lazyload();
}
