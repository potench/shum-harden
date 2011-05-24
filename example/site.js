// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* site.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// ## The RED Namespace
var RED = RED || {};

// ## Local Namespace
// Example Site object, controls global functionality and instantiates the Example Default Page.
// You should replace the namespace "Example" with your own Site namespace, this is only an example.
var Example = Example || {};

// Site shell object

// Model manager and shell manager
RED.SITE = $.extend(true, Example, RED, function () {
	
	return {
		
		init : function () {
			$(document).ready(this.onReady.call(this));
		},
		
		onReady : function () {
			var body = $("body"),
			    // Use `attr("data-page-class")` if < jQuery 1.6
				pageClass = body.data("pageClass");
			
			// creates `Page()` based on `<div data-page-class="Home">`
			if (pageClass && typeof Example.Page[pageClass] === "function") {
				this.page = new Example.Page[pageClass]();
			// defaults to `Example.Page();`
			} else {
				this.page = new Example.Page();
			}
		}
	};
}());