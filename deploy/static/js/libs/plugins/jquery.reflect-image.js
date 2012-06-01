/**
 * Clone a <canvas> element with its content intact. 
 */

(function ($) {
	
	$.fn.reflectImage = function(reflectH, imgH) {

		var $canvasResults;

		this.each(function () {
			if( $(this).is("img")) {
				var canvas = document.createElement("canvas"),
					context = canvas.getContext("2d"),
					w = $(this).outerWidth(),
					h = imgH || $(this).outerHeight(),
					rH = reflectH || h;

				if ( w > 0 && h > 0) {

					canvas.width = w;
					canvas.height = rH;

					context.globalCompositeOperation = "copy";
					
					var grad = context.createLinearGradient(0, 0, 0, rH);
					grad.addColorStop(0, 'rgba(0,0,0,1)');
					grad.addColorStop(1, 'rgba(0,0,0,0)');

					context.fillStyle = grad;
					context.translate(0,0);
					context.rect(0, 0, w, h);
					context.fill();


					context.globalCompositeOperation = "source-in";
					context.translate(0, h);
					context.scale(1, -1);
					context.drawImage(this, 0, 0, w, h);

					$(this).after($(canvas));
				}

				$canvasResults = $canvasResults || $(canvas);
				$canvasResults = $canvasResults.add($(canvas));
				
			} else {
				throw "Please only use <img> elements with the reflectImage function";
			}
		});

		return $canvasResults;
	};
}(jQuery));