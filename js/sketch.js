"use strict";

var composition = {};
var testImg;
var p_masks;
var p_images;
var p_strokes;

function preload() {
  var postCardObject = localStorage.getItem("postcardTemplate");
  postCardObject = JSON.parse(postCardObject);
  var text = postCardObject["text"];
  text = removeNonLetters(text);
  var textObjects = [];
  //TODO save and retrieve the location

  $.ajax({
    type: "GET",
    url: "assets/svg_test.xml",
    dataType: "xml",
    success: function (xml) {
      // Parse the xml file and get data
      var svgData = xmlToJson(xml);
      textObjects = svgData["svg"]["text"];

      // build the letter data object
      composition.greeting = text;
      composition.letters = getLetterData(textObjects);

      // Add the photo data to the letter object
      for (let i = 0; i < composition["letters"].length; i++) {
        var imageURL = JSON.parse(localStorage.getItem("image_selection"+i));
        // composition["letters"][i].img = imageURL;
        composition["letters"][i].img = loadImage(imageURL);
        // composition["letters"][i].imageMask = "assets/letters/"+text[i]+".svg";
        composition["letters"][i].imageMask = loadImage("assets/letters/"+text[i]+".svg");
        // composition["letters"][i].imageStroke = "assets/letters/"+text[i]+"_stroke.svg";
        composition["letters"][i].imageStroke = loadImage("assets/letters/"+text[i]+"_stroke.svg");
      }

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

      // for (let i = 0; i < composition["letters"].length; i++) {
      //   var thisImage = composition["letters"][i];
      //   // Mask letter
      //   thisImage.img.mask(thisImage.imgMask);
      //   // Draw Image
      //   image(thisImage.img, 0, 0, 150, 150);
      //   image(thisImage.imageStroke, 0, 0, 150, 150)
      //   console.log(thisImage);
      // }
    }
  });
  testImg = loadImage("img/kitten_01.jpg");
}

function removeNonLetters(str) {
  var newString = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      newString+=str[i];
    }
  }  return newString;
}

function setup() {
  // createCanvas(1875, 1275);
  var cnv = createCanvas(600, 400);
  cnv.parent("cardCanvas");
  background('#d3d3d3');

  console.log("calling setup");
  for (let i = 0; i < composition["letters"].length; i++) {
    var thisImage = composition["letters"][i];
    // Mask letter
    thisImage.img.mask(composition["letters"][i]["imageMask"]);

    // Draw Image
    image(thisImage.img, thisImage.x, thisImage.y, 150, 150);
    image(thisImage.imageStroke, thisImage.x, thisImage.y, 150, 150)
  }
}

function draw() {
}

function mouseClicked() {
  console.log("clicked");
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
