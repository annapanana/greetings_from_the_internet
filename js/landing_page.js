"use strict";
$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({full_width: true});
  autoplay();
  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 4500);
  }
});
