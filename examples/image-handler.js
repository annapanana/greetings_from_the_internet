"use strict";
new p5(p => {
  // "strict mode";

  const URL = 'http://s3-us-west-2.amazonaws.com/stonesouperduper.com/images/home_background.jpg';

  let img;

  p.preload = () => img = p.loadImage(URL, pic => p.print(pic), loadImgErrFix);
  p.setup = () => ( p.createCanvas(500, 400), p.noLoop() );
  p.draw = () => p.background(img);

  function loadImgErrFix(errEvt) {
    const pic = errEvt.target;

    if (!pic.crossOrigin)  return p.print(`Failed to reload ${pic.src}!`);

    p.print(`Attempting to reload ${pic.src} as a tainted image now...`);
    pic.crossOrigin = null, pic.src = pic.src;
  }
});
