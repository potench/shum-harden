// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* about.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// ## Local Namespace

// About Page class

// Site-specifc namespace
var Example = Example || {};

// Page namespace
Example.Page = Example.Page || {};
	
// About specific instance
Example.Page.About = (function () {
	
	return Example.Page.extend({
		
		// Over-writeable vars, ex:
		// 
		// 	var foo = new Page({
		// 		x : 10
		// 	});
		vars : {
			x : 100,
			// Results in `{ x : 1, y : 2 }` by inheriting from `Example.Page`
			y : 3,
			z : 4
		},
		
		// About  page level functionality
		init : function (vars) {}
		
	});
}.call(Example));
