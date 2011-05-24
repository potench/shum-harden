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
		
		// Middleware delegate function. Allows for scope retention inside loops, third party overrides, etc.
		//
		//     foo.bind("click", this.delegate(this, function () {
		//          console.log(this);
		//     }))
		delegate : function (scope, method) {
			return function () {
				if (typeof scope === "undefined" || typeof method === "undefined") {
					return false;
				}
				
				return method.apply(scope, arguments);
			};
		},
		
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
			return window.setTimeout(this.delegate(this, func), delay);
		},
		
		refresh : function (location) {},
		
				
		destroy : function () {}
		
	})
});
