// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* __PAGENAME__.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// ## Local Namespace

// __PAGE__ Page class

// Site-specifc namespace
var __NAMESPACE__ = __NAMESPACE__ || {};

// Page namespace
__NAMESPACE__.Page = __NAMESPACE__.Page || {};
	
// __PAGE__ specific instance
__NAMESPACE__.Page.__PAGE__ = (function () {
	
	// Extends __NAMESPACE__.Page
	return __NAMESPACE__.Page.extend({
		
		// Over-writeable vars
		vars : {},
		
		// __PAGE__ page level functionality
		init : function () {}
		
	});
}.call(__NAMESPACE__));
