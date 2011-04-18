/*
File: utils.js

About: Version
	1.0

Project: RED

Description:
	Includes all Utility functionality

Requires:
	- jQuery <http://jquery.com/>

Requires:
	- <class.js>
	- <namespace.js>

*/

/*global $: true, console: true, Class: true */

/*
Namespace: RED
	Scoped to the RED Global Namespace
*/
var RED = window.RED || {};

/*
Class: RED.Utils
	Creates the RED.Utils Class
*/
RED.Utils = Class.extend({
	
	// Middleware delegate function. Allows for scope retention.
	delegate : function (scope, method) {
		return function () {
			if (typeof scope === "undefined" || typeof method ==="undefined") {
				return false;
			}
			
			return method.apply(scope, arguments);
		};
	},
	
	preventDefault : function (e) {
		e.preventDefault();
	},
	
	// Middleware setTimeout method. Allows for scope retention inside timers.
	setTimeout : function (func, delay) {
		return window.setTimeout(this.delegate(this, func), delay);
	},
	
	refresh : function (location) {},
	
	destroy : function () {}
	
});

