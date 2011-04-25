/*
File: home.js

About: Version
	1.0

Project: RED-js-framework

Description:
	Home Page class
*/

/*global $: true, console: true, Class: true, Modernizr: true, History: true */
/*jslint browser: true, onevar: true */

var Example = Example || {}; // site-specifc namespace 
Example.Page = Example.Page || {}; // page namespace

	
Example.Page.Home = (function () {
	// Private vars
	
	// Public vars
	return Example.Page.extend({
		
		vars : { // over-writeable vars, ex: new Page({x:10});
			y : 2 // results in {x:1,y:2} by inheriting from Example.Page
		},
		
		init : function () {
			// Home  page level functionality
		}
	});
}.call(Example));
