"use strict";

var composition = {};
var testImg;
var curColor = {r:"f", g:"f", b:"f"};
// var p_masks;
// var p_images;
// var p_strokes;

function preload() {

  var postCardObject = localStorage.getItem("postcardTemplate");
  postCardObject = JSON.parse(postCardObject);
  // get the greetings text
  var text = postCardObject.text;
  // get the background image
  var backgroundImg = postCardObject.source;
  backgroundImg = changeImageFormat(backgroundImg);
  // get search text
  var searchText = postCardObject.searchText;

  text = removeNonLetters(text);
  var textObjects = [];


  $.ajax({
    type: "GET",
    url: "assets/postcard_01.xml",
    dataType: "xml",
    success: function (xml) {
      // Parse the xml file and get data
      var svgData = xmlToJson(xml);
      textObjects = svgData["svg"]["text"];

      // build the letter data object
      composition.greeting = text;
      composition.customText = searchText;
      composition.letters = getLetterData(textObjects);
      composition.backgroundImg = loadImage(backgroundImg);
      composition.customTextFont = loadFont("assets/fonts/Yellowtail-Regular.otf");


      // Add the photo data to the letter object
      for (let i = 0; i < composition["letters"].length; i++) {
        var imageURL = JSON.parse(localStorage.getItem("image_selection"+i));
        composition["letters"][i].img = loadImage(imageURL);
        composition["letters"][i].imageMask = loadImage("assets/letters/"+text[i]+".svg");
        composition["letters"][i].imageStroke = loadImage("assets/letters/"+text[i]+"_stroke.svg");
      }

      setup();

      // load all images
      // var allImageLoading = [];
      // for (var i = 0; i < composition["letters"].length; i++) {
      //   allImageLoading.push(loadImage(composition["letters"][i].img));
      //   allImageLoading.push(loadImage(composition["letters"][i].imageMask));
      //   allImageLoading.push(loadImage(composition["letters"][i].imageStroke));
      // }
      // Promise.all(allImageLoading).then(function (data) {
      //   console.log(data);
      // });
      initColorBlobs();
    }
  });
  testImg = loadImage("img/kitten_01.jpg");

  $("#color-palette").on("click", function(e) {
    updateColorSelection(e.target);
  });

  $("#done_editing").on("click", function(e) {
    // var $uploadedPhoto = $.
    console.log("done editing");
    addPhoto("postcards");
  });
}

function addPhoto(albumName) {
  // var files = document.getElementById('photoupload').files;
  // if (!files.length) {
  //   return alert('Please choose a file to upload first.');
  // }
  // var file = files[0];
  var file = "img/kitten_01.jpg";
  var fileName = file.name;
  var albumPhotosKey = encodeURIComponent(albumName) + '//';

  var photoKey = albumPhotosKey + fileName;

  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }
    alert('Successfully uploaded photo.');
    viewAlbum(albumName);
  });
}

function removeNonLetters(str) {
  var newString = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      newString+=str[i];
    }
  }  return newString;
}

function initColorBlobs() {

  $(".color-blob").each(function(e) {
    $(this).css("background-color", $(this).attr("name"));
    $(this).css("border-color", $(this).attr("name"));
  });
}

function setup() {
  // createCanvas(1875, 1275);
  var cnv = createCanvas(600, 400);
  cnv.parent("cardCanvas");
  background('#d3d3d3');
  image(composition.backgroundImg, 0, 0, 600, 400);
  drawCard();
}


function drawCard() {
  console.log("draw card");
  image(composition.backgroundImg, 0, 0, 600, 400);
  textSize(48);
  textFont(composition.customTextFont);
  textAlign(CENTER);
  fill(curColor.r, curColor.g, curColor.b);
  text("greentings from "+composition.customText, 300, 320);
  // composition.graphic.background(100);
  for (let i = 0; i < composition["letters"].length; i++) {
    var thisImage = composition["letters"][i];
    // Mask letter
    thisImage.img.mask(composition["letters"][i]["imageMask"]);

    // Draw Imag
    image(thisImage.img, thisImage.x, thisImage.y, 150, 150);

    // Draw stroke according to tint color
    tint(curColor.r, curColor.g, curColor.b);
    image(thisImage.imageStroke, thisImage.x, thisImage.y, 150, 150)
    noTint();
  }
}

function updateColorSelection(target) {
  initColorBlobs();
  if($(target).hasClass("color-blob")) {
    // console.log("update color");
    curColor = $(target).attr("name");
    curColor = hexToRgb(curColor);
    $(target).css("border-color", "black"); //set this to white
    drawCard();
  }
}

function mouseClicked() {
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


function getLetterData(textObjects) {
  var letters = [];
  // Get the X and Y coordinates of each letter
  for (var i = 0; i < textObjects.length; i++) {
    console.log(textObjects[i]["#text"]);
    // Is it a letter?
    if (textObjects[i]["#text"].length === 1) {
      var matrixStr = textObjects[i]["@attributes"]["transform"];
      var matrixVals = matrixStr.split(" ");
      var xCoord = Number(matrixVals[4]);
      var yCoord = Number(matrixVals[5].slice(0, -1));

      letters.push({letter: textObjects[i]["#text"], x: xCoord, y: yCoord});
    }
  }
  return letters;
}

// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function changeImageFormat(str) {
  var newStr = "";
  for (var i = 0; i < str.length; i++) {
    newStr+=str[i];
    if (str[i] === ".") {
      return newStr + "jpg";
    }
  }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
