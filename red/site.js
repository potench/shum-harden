// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* site.js */

// ## The red Namespace
var red = window.red || {};

$.extend(true, red, {
	
	// ## red.Class
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
