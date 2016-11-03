"use strict";

function setup() {
  console.log("setting up");
  var cnv = createCanvas(600, 400);
  cnv.parent("cardCanvas");
  background('#d3d3d3');

  var myCanvas = $("#cardCanvas").children("canvas")[0];
  var ctx = myCanvas.getContext('2d');
  var img = new Image;
  img.onload = function(){
    ctx.drawImage(img,0,0, 600, 400);
  };
  img.src = JSON.parse(localStorage.getItem("savedImage"));
}
