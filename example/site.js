/*
File: site.js

About: Version
	1.0

Project: red-js-framework

Description:
	Example Site object, controls global functionality and instantiates the Example Default Page 

*/

/*global $: true, console: true, Class: true */
/*jslint browser: true */

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
		
		models : {},
		
		init : function () {
			$(document).ready(this.onReady.call(this));
		},
		
		onReady : function () {
			var body = $(document.body),
			    _class = body.data("page-class");
			
			if (_class) {
				this.models[_class] = new Example.Page[_class](); // creates Page() based on <div data-page-class="Foo">
			} else {
				this.models.Page = new Example.Page(); // defaults to Example.Page()
			}
		}
		
	};
	
}());