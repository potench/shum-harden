// currently require modernizr.prefixed....

(function ($) {

	$.fn.cube = function(orderAr, dimensions) { 

		var createCube = function (orderAr) {
				var cubeStr = '<figure class="cube">',
					i = 0;

				for (i = orderAr.length - 1; i >= 0; i--) {
					cubeStr += '<div></div>'; // faces
				}

				cubeStr += '</figure>';

				return $(cubeStr);
			},

			projectCubeFace = function (face, side) { 
				
				var transformStr, // the transform to project this face
					w = dimensions.width,
					h = dimensions.height,
					d = dimensions.depth,
					$face = $(face),
					$front;

				switch(side) {
					case 'front':
						transformStr = "translateZ(" + (d/2) + "px)";
						$face.width(w);
						$face.height(h);
						$front = $face;
						break;
					case 'top':
						transformStr = "rotateX(90deg) translateZ(" + (d/2) + "px)";
						$face.width(w);
						$face.height(d);
						break;
					case 'bottom':
						transformStr = "rotateX(-90deg) translateZ(" + (h - (d/2)) + "px)";
						$face.width(w);
						$face.height(d);
						break;
					case 'back':
						transformStr = "rotateX(180deg) translateZ(" + (d/2) + "px)";
						$face.width(w);
						$face.height(h);
						break;
					case 'right': 
						transformStr = "rotateY(90deg) translateZ(" + (w - (d/2)) + "px)";
						$face.width(d);
						$face.height(h);
						break;
					case 'left':
						transformStr = "rotateY(-90deg) translateZ(" + (d/2) + "px)";
						$face.width(d);
						$face.height(h);
						break;
				}

				face.style[Modernizr.prefixed("transform")] = transformStr;

				return $front;
			};

		return (function () {
			var $cubes;


			this.each(function(){
				var $cube = $(this).hasClass("cube") ? $(this) : createCube(orderAr),
					$faces = $cube.find(" > div"),
					$front,
					i = 0;
				// jquery object default behavior to set depth to height
				dimensions = dimensions || {};
				dimensions.width = dimensions.width || $(this).outerWidth(true);
				dimensions.height =  dimensions.height || $(this).outerHeight(true);
				dimensions.depth = dimensions.depth || dimensions.height;					

				for (i = orderAr.length - 1; i >= 0; i--) { // only need as many faces as we have in the order Array			
					$front = projectCubeFace($faces[i], orderAr[i]) || $front;
				}

				$cube.data("depth", (-dimensions.depth/2));

				// return context of all cubes that have been appended
				$cubes = $cubes || $cube;
				$cubes = $cubes.add($cube);

				if (!$(this).hasClass("cube")) {
					$cube.get(0).style[Modernizr.prefixed("transform")] = "translateZ(" + (-dimensions.depth/2) + "px)";
					
					$(this).replaceWith($cube); // replace $(this) with the cube and project $(this) on to the front of the cube
					$front.html($(this));
				}
			});

			return $cubes;

		}.call(this));
	};
}(jQuery));