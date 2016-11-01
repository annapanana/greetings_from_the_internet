"use strict";
$(document).ready(function(){
  console.log("hello!");
  $('.carousel.carousel-slider').carousel({full_width: true});
  autoplay();
  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 4500);
  }
});
