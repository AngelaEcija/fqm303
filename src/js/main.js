function activeClass(url) {
	var urlWithoutSlash = url.split('grupos/FQM-303/');
	$("nav").find("a[href='" + urlWithoutSlash[1] + "']").parent().addClass('active');
}

function openMod(id) {
	$(id).openModal();
}


$(function(){
	$( "nav" ).load( "components/header.html", function(){
		activeClass(window.location.pathname);
		$(".button-collapse").sideNav();
	} );

	$( "footer" ).load( "components/footer.html");

	if (window.location.pathname.indexOf('instrumentation') >= 0){
		/*
		 * jQuery Succinct plugin
		 * Version 1.1.0 (October 2014)
		 */
		!function(a){"use strict";a.fn.succinct=function(b){var c=a.extend({size:240,omission:"...",ignore:!0},b);return this.each(function(){var b,d,e=a(this),f=/[!-\/:-@\[-`{-~]$/,g=function(){e.each(function(){b=a(this).html(),b.length>c.size&&(d=a.trim(b).substring(0,c.size).split(" ").slice(0,-1).join(" "),c.ignore&&(d=d.replace(f,"")),a(this).html(d+c.omission))})};g()})}}(jQuery);
	
		$('.ellipsis-short').succinct({
			size: 190
		});
	}

	$('.card-action a').click(function() {
		var id = $(this).attr('href');
		openMod(id);
	});

});





		// PHOTO GALLERY

/**
  * @param {Array<Object>} array of frame objects with height/width properties
  * @param {number} width of the containing element, in pixels
  * @param {number} maximum height of each row of images, in pixels
  * @param {number} spacing between images in a row, in pixels
  * @returns {Array<Array<Object>>} array of rows of resized frames
  */
var layoutFrames = function(images, containerWidth, maxRowHeight, spacing) {
  // Fit each image w/in the containerWidth, maxRowHeight dimensions
  images.forEach(function(image, index) {
	fitImage(image.width, image.height, containerWidth, maxRowHeight, function(updateImg) {
  	  image.width = updateImg.width;
	  image.height = updateImg.height;
	});
  });
  var rowArr;

  // Get the row array
  fitRows(images, containerWidth, maxRowHeight, spacing, null, function(rows) {
	rowArr = rows;	
  });

  return rowArr;
 }

// Generates the row array recursively
var fitRows = function(images, containerWidth, maxRowHeight, spacing, rows, callback) {
  // More images to be added to rows
  if (images.length !== 0) {
 	// Create rows array if does not yet exist (first iteration)
 	if (!rows) {
  	  rows = [];
	}
 	
 	// Get the next row	
 	getRow(images, containerWidth, maxRowHeight, spacing, function(row) {
 	  rows.push(row);
 	  // Remove already-added images from array
 	  images.splice(0, row.length);
 	  fitRows(images, containerWidth, maxRowHeight, spacing, rows, callback);
 	});		
  } else {
  	// Send rows object back
 	callback(rows);
  }
}

// Fit next row
var getRow = function(images, containerWidth, maxRowHeight, spacing, callback) {
  var rowWidth = images[0].width;
  var rowHeight = images[0].height;
  var index = 0;
  var row = [images[0]];
  var done = false;

  // If there is only one image left or the image is the full width of the row
  if (rowWidth == containerWidth || images.length == 1) {
	done = true;
  }
  
  // Add more images to the row until it is the correct size
  while (rowWidth < containerWidth - spacing * index && index < images.length - 1) {
	index++;
	row.push(images[index]);

	// Adjust the images to be the same height (the samaller of the two options)
	if (rowHeight == images[index].height) {
  	  rowWidth += images[index].width;
	} else if(rowHeight < images[index].height) {
	  resize(images[index].width, images[index].height, null, rowHeight, function(updatedImage) {
	  	rowWidth += updatedImage.width;
	  	images[index].height = updatedImage.height;
	  	images[index].width = updatedImage.width;
	  });
	} else {
	  rowHeight = images[index].height;
	  rowWidth = 0;

	  // All images already in the row must be resized
	  for (var i = 0; i < row.length; i++) {
		resize(images[i].width, images[i].height, null, rowHeight, function(updatedImg) {
	 	  rowWidth += updatedImg.width;
		  images[i].height = updatedImg.height;
		  images[i].width = updatedImg.width;
		});
	  }
	}

	// Row should be the length of the container minus the spacing between the images - spacing * index,
	// i.e. one for each image except one
	if (rowWidth > containerWidth - (spacing * index)) {
	  // Get the correct height of the row based on the desired width
	  resize(rowWidth, rowHeight, containerWidth - (spacing * (index)), null, function(updatedWidth) {
	    rowHeight = updatedWidth.height;
	    rowWidth = containerWidth - (spacing * index);
	    var widthSoFar = 0;

	    // Resize each image to the correct row height
	    for (var i = 0; i < row.length; i++) {
		  resize(images[i].width, images[i].height, null, rowHeight, function(updatedHeight) {
	    	images[i].height = rowHeight;
	  	    images[i].width = updatedHeight.width;
	  	    widthSoFar += images[i].width;
	  	  });
	    }

	    // Because of rounding, the width of the row may be up to numImages px off.
	    // Adjust for that by adding or subtracting 1px from the width of each image
	    // up to one time (so aspect ratio is still the same +/- 1px)
	    var adjust = 0;
	    if (widthSoFar > containerWidth - (spacing * index)) {
	  	  adjust = -1;
	    } else {
		  adjust = 1;
	    }
	    var img = 0;
	    while (widthSoFar != containerWidth - (spacing * index) && img < row.length) {
	  	  row[img].width = row[img].width + adjust;
	  	  widthSoFar += adjust;
	  	  img++;
	    }
	  });
    }

    // If the row is now the correct width (or there are no more images)
    if (rowWidth === containerWidth - (spacing * index)  || index == images.length - 1) {
  	  done = true;
    }
  }
  if (done) {
	callback(row);
  }
}

// Resize proportions to fit between the max dimensions while keeping
// the same ratio
var fitImage = function(width, height, maxWidth, maxHeight, callback) {
   var image = {width: width, height: height};

   // Resize by height if necessary
   if (image.height > maxHeight) {
 	resize(image.width, image.height, null, maxHeight, function(updatedWidth) {
 	  image.height = maxHeight; image.width = updatedWidth.width;
 	})
   }

   // Resize by width if necessary
   if (image.width > maxWidth) {
	resize(image.width, image.height, maxWidth, null, function(updatedHeight) {
	  image.width = maxWidth;
	  image.height = updatedHeight.height;
	});
  }

  callback(image);
 }

// Resize by either height or width (whichever is not null)
var resize = function(currWidth, currHeight, newWidth, newHeight, callback) {
 	var updateImg = {};

 	if (newWidth) {
 		var ratio = newWidth / currWidth;
 		updateImg.width = newWidth;
 		updateImg.height = Math.round(currHeight * ratio);
 	} else if (newHeight) {
 		var ratio = newHeight / currHeight;
 		updateImg.height = newHeight;
 		updateImg.width = Math.round(currWidth * ratio);
 	}
 	callback(updateImg);
 }



var currHeight = 360;
var currWidth = 800;
var currSpacing = 10;

function initGallery(containerWidth, maxRowHeight, spacing) {
  // Note that some of the images are the same but have been cropped differently; this is not a result
  // of the gallery js
  var images = [{url:"grupo1.jpg"}, 
  	{url:"GRUPO.jpg"},
  	{url:"GRUPO_FQM303_VERANO_2013.jpg"}];
  
  var frames = [{ height: 3000, width: 4000 },
  	{ height: 600, width: 800 },
  	{ height: 1440, width: 2560 }];

  $("#gallery").css("width", containerWidth);
  var rows = layoutFrames(frames, containerWidth, maxRowHeight, spacing);
  var index = 0;

  rows.forEach(function(row, rowIndex) {
	row.forEach(function(image, imgIndex) {
	  $("#gallery").append("<div style='width:" + (image.width) + "px; height:" + (image.height) + "px; margin-bottom:10px;' class='frame'></div>")
	  $("#gallery .frame").last().append("<img src='images/" + images[index].url + "' />")
	  	.append( images[index]);

	  if (imgIndex != 0) {
	    $("#gallery .frame").last().css("margin-left", spacing + "px");
	  }
	  index++;
    });
  });

  $(".frame").css("margin-bottom", spacing + "px");
}

$(function() { 
  initGallery(800, 360, 10);

  $("#settings").click(function(event) {
  	$("#changeSize").css("display", "block");
  });

  $("#formSubmit").click(function(event) {
  	if ($("#width").val()) {
  		console.log("There is a width??");
  		currWidth = parseInt($("#width").val());
  	}
  	if ($("#height").val()) {
  		console.log("There is a height??");
  		currHeight = parseInt($("#height").val());
    }
    if ($("#spacing").val()) {
    	console.log("There is a spacing??");
    	currSpacing = parseInt($("#spacing").val());
    }
  	$("#changeSize").css("display", "none");
  	$("#gallery").html("");
  	console.log("Calling init gallery w values currWidth: " + currWidth + " currHeight: " + currHeight + " currSpacing: " + currSpacing);
  	initGallery(currWidth, currHeight, currSpacing);
  })

});