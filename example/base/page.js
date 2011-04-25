/*
File: page.js

About: Version
	1.0

Project: RED-js-framework

Description:
	Default Page functionality for the "Example" website.  
	New pages will try to load a specialized class ("Home" for instance), 
	if one cannot be found, the site will instantiate this Page by default
*/
var Example = Example || {}; // site-specifc namespace 

Example.Page = (function () {
	// Private vars
	
	// Public vars
	return Example.Class.extend({
		
		vars : { // over-writeable vars, ex: new Page({x:10});
			x : 1 // example for inheriting and overwriting vars
		},
		
		init : function () {
			// Default page level functionality
		}
	});
}.call(Example));
