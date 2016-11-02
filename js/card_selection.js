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
      postcardTemplate.text = "hello";
      postcardTemplate.source = "assets/post_card_01.jpg"
      break;
    case "pcard2":
      postcardTemplate.text = "guten tag 1";
      break;
    case "pcard3":
      postcardTemplate.text = "howdy";
      break;
    case "pcard4":
      postcardTemplate.text = "oh2 hello 1";
      break;
    case "pcard5":
      postcardTemplate.text = "hey friend";
      break;
    default:
      console.error("Could not save selected postcard template");
  }
  localStorage.setItem("postcardTemplate", JSON.stringify(postcardTemplate));
}
