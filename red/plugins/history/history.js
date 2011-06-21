// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* history.js */

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
			complete : $.proxy(this.setupEvents, this)
		}]);
	},

	// Attach `statechange` event listener
	setupEvents : function () {
		History.Adapter.bind(window, "statechange", $.proxy(this.onStateChange, this));
	},

	// On `statechange`, call RED.Class.refresh
	onStateChange : function () {
		if (this.scope && this.scope.refresh) {
			this.scope.refresh.call(this.scope, History.getState());
		}
	}
	
});
