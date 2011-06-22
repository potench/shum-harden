// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* history.js */

// Custom [JSLint](http://jslint.com) settings.
/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

// The RED Namespace
var RED = RED || {};

// ## RED.History
// A bootstrap to add [History.js](https://github.com/balupton/History.js/) functionality to the Rosy Framework.
RED.History = RED.Class.extend({
	vars : {},
	
	// Load the required History.js dependencies.
	init : function (scope) {
		if (!scope || !RED.SYS || !RED.SYS.MEDIA_URL) {
			throw "You must define a scope.";
		}
		
		this.vars.scope = scope;
		
		var HISTORY_PATH = RED.SYS.MEDIA_URL + "js/red/plugins/history/";
		
		Modernizr.load([{
			test : window.JSON && window.JSON.stringify,
			nope : HISTORY_PATH + "libs/json2.js",
			both : HISTORY_PATH + "libs/amplify.store.js"
		}, {
			test : $,
			yep : HISTORY_PATH + "libs/plugins/history.adapter.jquery.js"
		}, {
			test : Modernizr.history,
			yep : HISTORY_PATH + "libs/history.js",
			nope : HISTORY_PATH + "libs/history.html4.js",
			complete : $.proxy(this.setupEvents, this)
		}]);
	},

	// Attach `statechange` event listener
	setupEvents : function () {
		$(document.body).delegate("a[rel='history']", "click", function (e) {
			var el = $(this);
			
			History.pushState({
				state : el.attr("title")
			}, el.attr("title"), el.attr("href"));
			
			e.preventDefault();
		});
		
		History.Adapter.bind(window, "statechange", $.proxy(this.onStateChange, this));
	},

	// On `statechange`, call RED.Class.refresh
	onStateChange : function () {
		var key, obj;
		
		for (key in this.vars.scope) {
			if (this.vars.scope.hasOwnProperty(key)) {
				obj = this.vars.scope[key];

				if (obj && obj.refresh) {
					obj.refresh.call(obj, History.getState());
				}
			}
		}
	}
	
});
