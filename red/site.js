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

RED.Module = (function () {
	// Private vars
	
	// Public vars
	return RED.Class.extend({
		
		vars : {
			events : {}
		},

		bind : function (type, method) {
			this.vars.events["on" + type] = this.vars.events["on" + type] || [];
			this.vars.events["on" + type].push(method);
		},
		
		unbind : function (type, method) {
			var group = this.vars.events["on" + type],
			    i, j;
			
			if (group) {
				for (i = 0, j = group.length; i < j; i++) {
					if (!method || group[i] === method) {
						group[i] = null;
					}
				}
			}
		},

		trigger : function (type, args) {
			if (!this.vars.events) {
				return;
			}
			
			var events = this.vars.events["on" + type],
			    i, j, event;
			
			if (events && events.length) {
				for (i = 0, j = events.length; i < j; i++) {
					event = events[i];
					
					if (event) {
						event.apply(this, args || [{
							type : type
						}]);
					}
				}
			}
		}
		
	});
}.call(RED));
