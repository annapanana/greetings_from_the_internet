"use strict";

// $(function() {
//
//   // load the stored image and append to main container
//   var selectedImageObj = localStorage.getItem("image_selection");
//   $("#photo_container").append('<img src=' + selectedImageObj + 'alt="selected_image" class="selected_image" name="selected_image">');
//
// });
var img;
function preload() {
  var selectedImageURL = localStorage.getItem("image_selection");
  var selectedImageURL = JSON.parse(selectedImageURL);
  console.log(selectedImageURL);
  img = loadImage(selectedImageURL, imageLoaded(), imageFailed());
}

function imageLoaded() {
  console.log("success!");
}

function imageFailed() {
  console.log("failed!");
}

function setup() {

}

function draw() {
  image(img, 0, 0);
}
