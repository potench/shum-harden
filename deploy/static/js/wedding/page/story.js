// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* home.js */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var wedding = wedding || {};

// Page namespace
wedding.page = wedding.page || {};

// Home specific instance
wedding.page.Story = (function () {

	var $container = $("#story"),
		$gallery = $container.find(".gallery");


	return wedding.Page.extend({

		vars : {

		},

		// Home  page level functionality
		init : function () {
			if (!Modernizr.cssreflections) {
				$gallery.find("img").reflectImage(80);
			}
		}

	});
}.call(wedding));
