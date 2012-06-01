// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* home.js */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var wedding = wedding || {};

// Page namespace
wedding.page = wedding.page || {};

// Home specific instance
wedding.page.Home = (function () {

	var $welcome = $("#welcome"),
		$hero =  $welcome.find(".hero");

	return wedding.Page.extend({

		vars : {

		},

		// Home  page level functionality
		init : function () {
			
			if (!Modernizr.cssmask) {
				this.simulateImageMask();
			} else {
				// need to place this image below
				$hero.clone().appendTo($("#rsvp aside"));
			}
		},

		simulateImageMask : function () {
			$hero.find("img").imagesLoaded(function ($images, $proper, $broken) {
				$canvas = $proper.filter(".us").maskImage($proper.filter(".mask"), $proper.filter(".shadow"));
				$canvas.cloneCanvas().appendTo($("#rsvp aside"))
			});
		}

	});
}.call(wedding));
