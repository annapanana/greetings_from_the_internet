"use strict";
$(function() {

  var canvas = $("#canvas");
  var context = canvas.getContext('2d');


  // load the stored image and append to main container
  var selectedImageObj = localStorage.getItem("image_selection");
  // $("#photo_container").append('<img src=' + selectedImageObj + 'alt="selected_image" class="selected_image" name="selected_image">');

  context.drawImage(selectedImageObj);
});
