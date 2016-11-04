"use strict";

$(document).ready(function(){
  console.log("hello!");
  $(".card-thumb").on("click", function() {
    updateGallery(event.target)
  });

  $("#nav_to_search").on("click", function() {
    templateSelection();
  });

  $(".card-thumb").mouseenter(function() {
    TweenMax.to($(this), .2, {css:{scaleX:1.1, scaleY:1.1}});
  });
  $(".card-thumb").mouseleave(function() {
    TweenMax.to($(this), .2, {css:{scaleX:1, scaleY:1}});
  });
});

function updateGallery(target) {
  var preview = $("#preview");
  preview.attr("src", $(target).attr("src"));
  preview.attr("name", $(target).attr("name"));
  console.log(preview.attr("src"));
  templateSelection(preview);
}

function templateSelection(preview) {
  var postcardTemplate = {
    source: preview.attr("src"),
    text: "",
  }
  switch (preview.attr("name")) {
    case "pcard1":
      postcardTemplate.text = "HELLO";
      break;
    case "pcard2":
      postcardTemplate.text = "GUTEN TAG";
      break;
    case "pcard3":
      postcardTemplate.text = "HOWDY";
      break;
    case "pcard4":
      postcardTemplate.text = "OH HELLO";
      break;
    case "pcard5":
      postcardTemplate.text = "HEY FRIEND";
      break;
    default:
      console.error("Could not save selected postcard template");
  }
  localStorage.setItem("postcardTemplate", JSON.stringify(postcardTemplate));
}
