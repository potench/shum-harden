/*
File: home.js

About: Version
	1.0

Project: RED-js-framework

Description:
	Home Page class
*/
var Example = Example || {}; // site-specifc namespace 
Example.Page = Example.Page || {}; // page namespace

	
Example.Page.About = (function () {
	// Private vars
	
	// Public vars
	return Example.Page.extend({
		
		vars : { // over-writeable vars, ex: new Page({x:10});
			x : 100,
			y : 3, // results in {x:1,y:2} by inheriting from Example.Page
			z : 4
		},
		
		init : function (vars) {
			// About  page level functionality
		}
		
	});
}.call(Example));
