// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* home.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var Example = Example || {};

// Page namespace
Example.Page = Example.Page || {};
	
// Home specific instance
Example.Page.Home = (function () {
	
	// Extends Example.Page
	return Example.Page.extend({
		
		// Over-writeable vars, ex:
		// 
		// 	var foo = new Page({
		// 		x : 10
		// 	});
		vars : {
			// Results in `{ x : 1, y : 2 }` by inheriting from `Example.Page`
			z : 3
		},
		
		// Home  page level functionality
		init : function () {}
		
	});
}.call(Example));
