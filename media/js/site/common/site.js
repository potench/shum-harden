/*
File: site.js

About: Version
	1.0

Project: SITE

Description:
	Global namespace & shared utilities

Requires:
	- jQuery <http://jquery.com/>
	- Modernizr <http://modernizr.com/>

Requires:
	- <namespace.js>
	- <class.js>
	- <utils.js>

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

RED.SITE = $.extend(RED.SITE, function () {
	
	// Private variables/functions
	
	// Public
	return {
		models : {},
		
		init : function () {
			// Setup History Events
			RED.require("history", this);
			
			$(document).ready(this.onReady);
		},
		
		onReady : function () {
			var body = $(document.body);
			
			Modernizr.load([{
				test : $,
				yep : {
					"Global" : SYS.MEDIA_URL + "js/site/common/global.js"
				},
				callback : function (url, result, key) {
					if (result) {
						RED.HBO.models.Global = new RED.HBO.Global();
					}
				}
			}, {
				test : body.hasClass("home"),
				yep : {
					"Home" : SYS.MEDIA_URL + "js/site/home.js"
				},
				callback : function (url, result, key) {
					if (result) {
						RED.HBO.models.Home = new RED.HBO.Home();
					}
				}
			}, {
				test : body.hasClass("about"),
				yep : {
					"About" : SYS.MEDIA_URL + "js/site/about.js"
				},
				callback : function (url, result, key) {
					if (result) {
						RED.HBO.models.About = new RED.HBO.About();
					}
				}
			}, {
				test : body.hasClass("contact"),
				yep : {
					"Contact" : SYS.MEDIA_URL + "js/site/contact.js"
				},
				callback : function (url, result, key) {
					if (result) {
						RED.HBO.models.Contact = new RED.HBO.Contact();
					}
				}
			}]);
			
		},
		
		refresh : function (state) {
			console.group("History State: %s", state.data.state);
				console.log(state);
				for (var key in state) {
					console.log("%s : %s", key, state[key]);
				}
			console.groupEnd();
			
			$.each(this.models, function (key, model) {
				if (typeof model.refresh === "function") {
					model.refresh.apply(model, location);
				}
			});
		}
	};
	
}());
