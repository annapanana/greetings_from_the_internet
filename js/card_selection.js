"use strict";

$(document).ready(function(){
  console.log("hello!");
  $(".card-thumb").on("click", function() {
    updateGallery(event.target)
  });

  $("#nav_to_search").on("click", function() {
    templateSelection();
  });
});

function updateGallery(target) {
  var preview = $("#preview");
  preview.attr("src", $(target).attr("src"));
  preview.attr("name", $(target).attr("name"));
  templateSelection(preview);
}

function templateSelection(preview) {
  var postcardTemplate = {
    source: preview.attr("src"),
    text: ""
  }
  switch (preview.attr("name")) {
    case "pcard1":
      postcardTemplate.text = "Hello";
      break;
    case "pcard2":
      postcardTemplate.text = "Guten Tag!";
      break;
    case "pcard3":
      postcardTemplate.text = "Howdy";
      break;
    case "pcard4":
      postcardTemplate.text = "Oh, Hello!";
      break;
    case "pcard5":
      postcardTemplate.text = "Hey Friend";
      break;
    default:
      console.error("Could not save selected postcard template");
  }
  localStorage.setItem("postcardTemplate", JSON.stringify(postcardTemplate));
}
