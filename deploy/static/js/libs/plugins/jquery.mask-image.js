/**
 * Masking images in canvas - png masks (jpeg | png | whatever)
 * 
 */

(function ($) {

	$.fn.maskImage = function($mask, $other) {

		var $canvasResults;

		this.each(function () {

			if( $(this).is("img") && $mask.is("img")) { 

				var canvas = document.createElement("canvas"),
					context = canvas.getContext("2d"),
					
					w = $(this).outerWidth(),
					h = $(this).outerHeight();

				if (!(canvas.getContext && context)) {
					return;
				}

				canvas.width = w;
				canvas.height = h;

				if( w > 0 && h > 0) {
					context.save();
					context.globalCompositeOperation = "copy";
					context.drawImage($mask.get(0), 0, 0);
					context.globalCompositeOperation = "source-in";
					context.drawImage(this, 0, 0);

					if ($other) { // adding shadow in
						context.globalCompositeOperation = "destination-over";
						context.drawImage($other.get(0), 0, 0);	
					}
					
					context.restore();

					$(canvas).prependTo($(this).parent());
				}

				$canvasResults = $canvasResults || $(canvas);
				$canvasResults = $canvasResults.add($(canvas));

			} else {
				throw "Please supply only <img> elements to the maskImage function";
			}
		});

		return $canvasResults;
	};
}(jQuery));