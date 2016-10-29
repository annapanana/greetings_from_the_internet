"use strict";

var img;
var imageMask;
function preload() {
  var selectedImageURL = localStorage.getItem("image_selection");
  var selectedImageURL = JSON.parse(selectedImageURL);
  console.log(selectedImageURL);
  img = loadImage(selectedImageURL, imageLoaded());
  imageMask = loadImage("img/letter_test.svg", imageLoaded());
}

function imageLoaded() {
  console.log("success!");
}

function setup() {
  // createCanvas(1875, 1275);
  createCanvas(800, 600);
  background('#d3d3d3');
  img.mask(imageMask);
  image(img, 0, 0, 300, 300);
}

function draw() {

}

function mouseClicked() {
  console.log("clicked");
  // saveCanvas('myCanvas', 'jpg');
  // $.ajax({
  //   type: "POST",
  //   url: 'https://g-lob.herokuapp.com/v1/addresses/test_97f0caa8c52f230f7bef2daef8b58e70f81',
  //   data: {
  //     name: "Anna Lotko",
  //     address_line1: "1260 Blala Avenue",
  //     address_line2: "Unit 15",
  //     address_city: "Smolder",
  //     address_state: "Colorado",
  //     address_zip: "80304",
  //     address_country: "United States",
  //   },
  // });
}
