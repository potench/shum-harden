/*
File: home.js

Home: Version
	1.0

Project: SITE

Description:
	Includes all Home functionality

Requires:
	- jQuery <http://jquery.com/>
	- Modernizr <http://modernizr.com/>

Requires:
	- <namespace.js>
	- <class.js>
	- <utils.js>
	- <site.js>
	- <page.js>
	- <global.js>

*/

/*global $: true, console: true, Class: true */

/*
Namespace: RED
	Scoped to the RED Global Namespace
*/
var RED = window.RED || {};

/*
Class: RED.SITE
	Under the RED.SITE Class
*/
RED.SITE = RED.SITE || {};

/*
Class: RED.SITE.Home
	@extends RED.SITE
*/
RED.SITE.Home = (function () {
	
	// <this scope="RED">
	// </this>
	
	// <this scope="RED.SITE.Home">
	
	return RED.SITE.Page.extend({
		vars : {},
		
		/*
		Function: RED.SITE.Home.scope
		*/
		init : function () {
			this.sup();
			this.setupEvents();
		},
		
		setupEvents : function () {}
	});
	
	// </this>
	
}.call(RED));
