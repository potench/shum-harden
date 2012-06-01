/**
 * Clone a <canvas> element with its content intact. 
 */

(function ($) {
	
	$.fn.cloneCanvas = function() {

		var $canvasResults;

		this.each(function () {
			if( $(this).is("canvas")) {
				var canvas = document.createElement("canvas"),
					context = canvas.getContext("2d"),
					w = $(this).outerWidth(),
					h = $(this).outerHeight();

				canvas.width = w;
				canvas.height = h;

				context.drawImage(this, 0, 0);

				$canvasResults = $canvasResults || $(canvas);
				$canvasResults = $canvasResults.add($(canvas));
				
			} else {
				throw "Please supply only <canvas> elements to the cloneCanvas function";
			}
		});

		return $canvasResults;
	};
}(jQuery));