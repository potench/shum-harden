/*
File: site.js

About: Version
	1.0

Project: Rosy Framework

Description:
	The RED Default Module Class. Contains helper functions shared by modules.

*/

/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

/*
Namespace: RED
	Scoped to the RED Global Namespace
*/
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
