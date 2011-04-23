/*
File: home.js

About: Version
	1.0

Project: red-js-framework

Description:
	Includes Home functionality 

*/

/*global $: true, console: true, Class: true, RED: true */
/*jslint browser: true */

var Example = Example || {}; // site-specifc namespace 

/**
 * Site shell object
 * Model manager and shell manager
 */		
Example.Home = (function () { // inherit the RED framework and go from there
	
	// Private variables/functions

	// Public
	return Example.Page.extend({
		
		models : {},
		
		init : function () {
			this.sup();
		}
		
	});
	
}.call(Example));