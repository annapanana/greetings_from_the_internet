"use strict";

var img = [];
var imageMask = [];
var imageStroke = [];


function preload() {
  var postCardObject = localStorage.getItem("postcardTemplate");
  postCardObject = JSON.parse(postCardObject);
  var text = postCardObject["text"];
  text = removeNonLetters(text);
  console.log(text);

  for (var i = 0; i < text.length; i++) {
      var selectedImageURL = localStorage.getItem("image_selection"+i);
      var selectedImageURL = JSON.parse(selectedImageURL);
      var thisImage = loadImage(selectedImageURL, imageLoaded());
      img.push(thisImage);
      var thisLetter = loadImage("assets/letters/"+text[i]+".svg");
      imageMask.push(thisLetter);
      var thisStroke = loadImage("assets/letters/"+text[i]+"_stroke.svg");
      imageStroke.push(thisStroke);
  }
}

function removeNonLetters(str) {
  var newString = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      newString+=str[i];
    }
  }
  // return str.length === 1 && str.match(/[a-z]/i);
  return newString;
}

function imageLoaded() {
  // console.log("success!");
}

function setup() {
  // createCanvas(1875, 1275);
  var cnv = createCanvas(600, 400);
  cnv.parent("cardCanvas");
  background('#d3d3d3');
  var xVal = 0;
  for (var i = 0; i < img.length; i++) {
    img[i].mask(imageMask[i]);
    image(img[i], xVal, 0, 150, 150);
    image(imageStroke[i], xVal, 0, 150, 150);
    xVal += 115;
  }
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
