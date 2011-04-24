/*
File: history.js

About: Version
	1.0

Project: RED

Description:
	Includes all History functionality

Requires:
	- Modernizr <http://modernizr.com/>

Requires:
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
Class: RED.History
	Creates the RED.History Class
*/
RED.History = RED.Utils.extend({
	
	init : function (scope) {
		if (!scope) {
			throw "You must define a scope.";
		}
		
		this.scope = scope;
		
		Modernizr.load([{
			test : "JSON" in window,
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
	
	setupEvents : function () {
		// Bind to StateChange Event
		History.Adapter.bind(window, "statechange", this.delegate(this, this.onStateChange));
	},
	
	onStateChange : function () { // Note: We are using statechange instead of popstate
		this.scope.refresh.call(this.scope, History.getState());
	}
	
});

