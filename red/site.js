// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* site.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// ## The RED Namespace
var RED = window.RED || {};

$.extend(true, RED, {
	
	// ## RED.Class
	Class : Class.extend({
		
		// Middleware preventDefault method. A shortcut to avoid delegation for a simple task.
		//
		//     foo.bind("click", this.preventDefault);
		preventDefault : function (e) {
			e.preventDefault();
		},
		
		// Middleware setTimeout method. Allows for scope retention inside timers.
		//
		//     this.setTimeout(function () {
		//         // do stuff
		//     }, 1000);
		setTimeout : function (func, delay) {
			return window.setTimeout($.proxy(func, this), delay);
		}
	})
});
