/*
File: page.js

About: Version
	1.0

Project: red-js-framework

Description:
	Default inheritable class

*/

/*global $: true, console: true, Class: true */
/*jslint browser: true */

var Example = Example || {}; // site-specifc namespace 

/**
 * Site shell object
 * Model manager and shell manager
 */		
Example.Page = (function() {
	// Private vars
	
	// Public vars
	return Example.Class.extend({
		
		vars : { // over-writeable vars, ex: new Page({x:10});
	 		x:1,
	 		y:2
	 	},
	 	
	 	init : function() {
	 		// Default page level functionality
	 	}
	});
}.call(Example));
