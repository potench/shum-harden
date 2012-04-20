// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// You should replace the namespace "wedding" with your own Site namespace, this is only an wedding.
var wedding = wedding || {};
	wedding.module = wedding.module || {};

// Site shell object
wedding.module.Module = (function () {
	
	return wedding.Module.extend({
		vars : {
			delays : [],
			delay_timer : null,
			resize_timer : null, // timeout 
			resize_throttle : 100 // throttle the resize callback
		},

		init : function () {
			$(window).bind('resize', $.proxy(this.onDelayedResize, this));
		},

		onResize: function () {
			// stub for running onResize methods
		},

		onDelayedResize : function (e) {
			if (e) {
				if (this.vars.resize_timer) {
					window.clearTimeout(this.vars.resize_timer);	
				}
				this.vars.resize_timer = window.setTimeout($.proxy(this.onDelayedResize, this), this.vars.resize_throttle);
			} else {
				this.onResize();
			}
		},		

		destroy : function () {
			$(window).unbind('resize', $.proxy(this.onDelayedResize, this));
		}

	});
	
}.call(wedding));
