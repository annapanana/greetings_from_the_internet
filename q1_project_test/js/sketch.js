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
  // createCanvas(1875, 1275);
  createCanvas(800, 600);
  background(51);
}

function draw() {
  image(img, 0, 0);
}

function mouseClicked() {
  console.log("clicked");
  $.ajax({
    // type: "POST",
    // url: 'https://api.lob.com/v1/addresses/test_97f0caa8c52f230f7bef2daef8b58e70f81',
    // data: {
    //   "id": "adr_f4540ef741dd2b23",
    //   "description": null,
    //   "name": "Anna Lotko",
    //   "company": null,
    //   "phone": null,
    //   "email": null,
    //   "address_line1": "1260 Blala Avenue",
    //   "address_line2": "Unit 15",
    //   "address_city": "Smolder",
    //   "address_state": "Colorado",
    //   "address_zip": "80304",
    //   "address_country": "United States",
    //   "metadata": {},
    //   "date_created": "2016-10-28T21:25:23.688Z",
    //   "date_modified": "2016-10-28T21:25:23.688Z",
    //   "object": "address"
    // },
  });
}
