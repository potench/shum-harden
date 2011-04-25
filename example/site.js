/*
File: site.js

About: Version
	1.0

Project: RED-js-framework

Description:
	Example Site object, controls global functionality and instantiates the Example Default Page 
	You should replace the namespace "Example" with your own Site namespace, this is only an example
*/

/*global $: true, console: true, Class: true, Modernizr: true, History: true */
/*jslint browser: true, onevar: true */

/*
Namespace: Example // RED.SITE
	Scoped to the Example Global Namespace
	Scoped to the RED.SITE in RED Namespace for abstraction in index.html
*/
var RED = RED || {}; // RED framework namespace

var Example = Example || {}; // site-specifc namespace 

/**
 * Site shell object
 * Model manager and shell manager
 */		
RED.SITE = $.extend(true, Example, RED, function () { // inherit the RED framework and go from there
	
	// Private variables/functions
	
	// Public
	return {
		
		init : function () {
			$(document).ready(this.onReady.call(this));
		},
		
		onReady : function () {
			var body = $("body"),
				pageClass = body.data("page-class"); // use attr("data-page-class") if < jquery 1.5
			
			this.page = new (Example.Page[pageClass] || Example.Page)(); // creates Page() based on <div data-page-class="Home">, defaults to Example.Page();
			console.group("page", pageClass, this.page);
		},
		
		setDOMReferences : function () {
			
		}
	};
}());