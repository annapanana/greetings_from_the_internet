"use strict";

function setup() {
  console.log("setting up");

  var cnvFront = createCanvas(450, 300);
  cnvFront.parent("canvasFront");
  background('#d3d3d3');
  // pg = createGraphics(100, 100);

  var myCanvas = $("#canvasFront").children("canvas")[0];
  var ctx = myCanvas.getContext('2d');
  var img = new Image;
  img.onload = function(){
    ctx.drawImage(img,0,0, 450, 300);
  };
  img.src = JSON.parse(localStorage.getItem("savedImage"));
  // pg.background(100);
  // pg.noStroke();
  // pg.ellipse(pg.width/2, pg.height/2, 50, 50);
  // image(pg, 50, 50);
}
