// Site-specifc namespace
var wedding = wedding || {};

// Page namespace
wedding.page = wedding.page || {};

wedding.page.Guests = (function () {

	var $container = $("#guests"),
		$hotel = $container.find(".hotel"),
		$registries = $(".registries li");


	return wedding.Page.extend({

		vars : {

		},

		init : function () {
			
			$registries.find("img").reflectImage(40);
			$hotel.find("img").reflectImage(40);

		}

	});
}.call(wedding));
