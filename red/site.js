/*
File: site.js

About: Version
	1.0

Project: RED-js-framework

Description:
	The RED Default Site Object, contains reference to the RED default Class object.

*/

/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

/*
Namespace: RED
	Scoped to the RED Global Namespace
*/
var RED = window.RED || {};

$.extend(true, RED, {
	
	Class : Class.extend({ // default class for RED framework
		
		// Middleware delegate function. Allows for scope retention.
		delegate : function (scope, method) {
			return function () {
				if (typeof scope === "undefined" || typeof method === "undefined") {
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
		
	})
});
