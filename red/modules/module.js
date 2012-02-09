// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* module.js */

// ## The RED Namespace
var RED = RED || {};

// ## RED.Module
// The Module Class. Contains helper functions shared by modules.
RED.Module = (function () {
	
	// Extend RED.Class
	return RED.Class.extend({
		
		// Store class-specific variables
		vars : {
			// Create a cache of custom events
			events : {}
		},

		// Bind a custom event(s) to a given module
		bind : function (type, method) {
			this.vars.events["on" + type] = this.vars.events["on" + type] || [];
			this.vars.events["on" + type].push(method);
		},
		
		// Unbind a custom event(s) from a given module
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

		// Triggers attached custom events
		trigger : function (type, args) {
			if (!this.vars.events) {
				return;
			}
			
			var events = this.vars.events["on" + type],
				i, j, event;
			
			if (events && events.length) {
				if (Object.prototype.toString.call(args) !== "[object Array]") {
					args = [args];
				}

				args[0].type = args[0].type || type;

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
