"use strict";

function setup() {
  console.log("setting up");
  $("#banner").fadeIn( "slow");
  var cnvFront = createCanvas(450, 300);
  cnvFront.parent("canvasFront");
  background('#FFF');
  // pg = createGraphics(100, 100);

  var myCanvas = $("#canvasFront").children("canvas")[0];
  var ctx = myCanvas.getContext('2d');
  var img = new Image;
  img.onload = function(){
    ctx.drawImage(img,0,0, 450, 300);
  };
  img.src = JSON.parse(localStorage.getItem("savedImage"));
}

function mouseClicked() {
  // saveCanvas('myCanvas', 'jpg');
}
