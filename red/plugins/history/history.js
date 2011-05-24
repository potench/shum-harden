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

	// Load the required History.js dependencies.
	init : function (scope) {
		if (!scope) {
			throw "You must define a scope.";
		}
		
		this.scope = scope;
		
		Modernizr.load([{
			test : window.JSON && window.JSON.stringify,
			nope : "media/js/libs/json2.js",
			both : "media/js/libs/amplify.store.js"
		}, {
			test : $,
			yep : "media/js/libs/plugins/history.adapter.jquery.js"
		}, {
			test : Modernizr.history,
			yep : "media/js/libs/history.js",
			nope : "media/js/libs/history.html4.js",
			complete : this.delegate(this, this.setupEvents)
		}]);
	},

	// Attach `statechange` event listener
	setupEvents : function () {
		History.Adapter.bind(window, "statechange", this.delegate(this, this.onStateChange));
	},

	// On `statechange`, call RED.Class.refresh
	onStateChange : function () {
		this.scope.refresh.call(this.scope, History.getState());
	}
	
});

