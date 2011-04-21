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
			
			$(document).ready(this.onReady.call(this));
		},
		
		onReady : function () {
			var body = $(document.body);
			
			this.load([{
				test : $,
				yep : {
					"Global" : "/media/js/site/common/global.js"
				}
			}, {
				test : body.hasClass("home"),
				yep : {
					"Home" : "/media/js/site/home.js"
				}
			}, {
				test : body.hasClass("about"),
				yep : {
					"About" : "/media/js/site/about.js"
				}
			}, {
				test : body.hasClass("contact"),
				yep : {
					"Contact" : "/media/js/site/contact.js"
				}
			}]);
		},
		
		load : function (stack) {
			for (var i = 0, j = stack.length; i < j; i++) {
				stack[i].callback = this.onScriptLoad;
			}
			
			return Modernizr.load(stack);
		},
		
		onScriptLoad : function (url, result, key) {
			if (result) {
				console.group("new RED.SITE.Page." + key);
					RED.SITE.models[key] = new RED.SITE[key]();
					console.log("RED.SITE." + key, RED.SITE.models[key]);
				console.groupEnd();
			}
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
