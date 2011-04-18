/*
File: page.js

About: Version
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
Class: RED.SITE.Page
	Creates the RED.SITE.Page Class
*/
RED.SITE.Page = RED.Utils.extend({
	
	vars : {},
	
	init : function () {
		this.storeDOMReferences();
	},
	
	storeDOMReferences : function () {
		$.extend(this.vars, {
			win : $(window),
			doc : $(document),
			body : $("body")
		});
	}
	
});

