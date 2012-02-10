// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* scroller.js */

/*global opera, Scroller */

// The RED Namespace
var RED = RED || {};

// Module namespace
RED.module = RED.module || {};

// ## RED.Scroller
// Creates a countdown scroller.
// 
// Usage:
// 
//  var scroller = new RED.module.Scroller({
//      target : $('#scrollable')
//  });
// 
//  scroller.bind("touchstart", function () {
//      // on touch start
//  });
// 
//  scroller.bind("touchmove", function () {
//      // on touch move
//  });
// 
//  scroller.bind("touchend", function () {
//      // on touch end
//  });
// 
//  scroller.bind("touchinertia", function () {
//      // on touch inertia
//  });
RED.module.Scroller = (function () {
	
	// Extends RED.Module
	return RED.Module.extend({
		
		vars : {},

		init : function (vars) {
			this.setDOMReferences();
			this.setupScroller();
		},

		setDOMReferences : function () {
			// No need for jQuery arrays. We're doing it vanilla-style.
			this.vars.target = this.vars.target[0] || this.vars.target;
		},

		/* DOM-based rendering (Uses 3D when available, falls back on margin when transform not available) */
		renderingEngine : function (scope) {
			var docStyle = document.documentElement.style,
				engine, vendorPrefix, undef,
				helperElem = document.createElement("div"),
				perspectiveProperty, transformProperty,
				self = this;

			if ("opera" in window && Object.prototype.toString.call(opera) === "[object Opera]") {
				engine = "presto";
			} else if ("MozAppearance" in docStyle) {
				engine = "gecko";
			} else if ("WebkitAppearance" in docStyle) {
				engine = "webkit";
			} else if (typeof navigator.cpuClass === "string") {
				engine = "trident";
			}

			vendorPrefix = {
				trident: "ms",
				gecko: "Moz",
				webkit: "Webkit",
				presto: "O"
			}[engine];

			perspectiveProperty = vendorPrefix + "Perspective";
			transformProperty = vendorPrefix + "Transform";

			if (helperElem.style[perspectiveProperty] !== undef) {

				return function (left, top, zoom) {
					scope.style[transformProperty] = "translate3d(" + (-left) + "px," + (-top) + "px,0) scale(" + zoom + ")";

					self.trigger("touchinertia", {
						type: "touchinertia",
						translateX: left,
						translateY: top,
						zoom: zoom
					});
				};

			} else if (helperElem.style[transformProperty] !== undef) {

				return function (left, top, zoom) {
					scope.style[transformProperty] = "translate(" + (-left) + "px," + (-top) + "px) scale(" + zoom + ")";

					self.trigger("touchinertia", {
						translateX: left,
						translateY: top,
						zoom: zoom
					});
				};

			} else {

				return function (left, top, zoom) {
					scope.style.marginLeft = left ? (-left / zoom) + "px" : "";
					scope.style.marginTop = top ? (-top / zoom) + "px" : "";
					scope.style.zoom = zoom || "";

					self.trigger("touchinertia", {
						translateX: left,
						translateY: top,
						zoom: zoom
					});
				};

			}
		},
		
		setupScroller : function () {
			var container = this.vars.target,
				content = container.getElementsByTagName("div")[0],
				scroller, rect, key,
				self = this;

			// Initialize Scroller
			scroller = new Scroller(this.renderingEngine(content), this.vars);

			for (key in scroller) {
				if (!(/^__/).test(key) && typeof scroller[key] === "function") {
					this.extendProp(key, scroller);
				}
			}

			// Setup Scroller
			rect = container.getBoundingClientRect();
			scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);

			// Update Scroller dimensions for changed content
			scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight/* - 50*/);

			this.vars.scroller = scroller;
			this.setupEvents();
		},

		extendProp : function (key, scroller) {
			this[key] = function () {
				return scroller[key].apply(scroller, arguments);
			};
		},

		setOption : function (key, value) {
			this.vars.scroller.options[key] = value;
		},

		setupEvents : function () {
			var container = this.vars.target,
				scroller = this.vars.scroller,
				mousedown,
				self = this;

			// Event Handler
			if ("ontouchstart" in window) {
				container.addEventListener("touchstart", function (e) {
					// Don't react if initial down happens on a form element
					if (e.target.tagName.match(/input|textarea|select/i)) {
						return;
					}

					scroller.doTouchStart(e.touches, e.timeStamp);
					self.trigger(e.type, e);

					e.preventDefault();
				}, false);

				document.addEventListener("touchmove", function (e) {
					scroller.doTouchMove(e.touches, e.timeStamp);
					self.trigger(e.type, e);
				}, false);

				document.addEventListener("touchend", function (e) {
					scroller.doTouchEnd(e.timeStamp);
					self.trigger(e.type, e);
				}, false);
			} else {
				mousedown = false;

				container.addEventListener("mousedown", function (e) {
					// Don't react if initial down happens on a form element
					if (e.target.tagName.match(/input|textarea|select/i)) {
						return;
					}

					scroller.doTouchStart([{
						pageX: e.pageX,
						pageY: e.pageY
					}], e.timeStamp);
					self.trigger("touchstart", e);

					mousedown = true;
				}, false);

				document.addEventListener("mousemove", function (e) {
					if (!mousedown) {
						return;
					}

					scroller.doTouchMove([{
						pageX: e.pageX,
						pageY: e.pageY
					}], e.timeStamp);
					self.trigger("touchmove", e);

					mousedown = true;
				}, false);

				document.addEventListener("mouseup", function (e) {
					if (!mousedown) {
						return;
					}

					scroller.doTouchEnd(e.timeStamp);
					self.trigger("touchend", e);

					mousedown = false;
				}, false);
			}
		}
	});
	
}.call(RED));
