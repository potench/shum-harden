/*
File: namespace.js

About: Version
	1.0

Project: RED

Description:
	The RED Namespace

*/

/*global $: true, console: true, Class: true */

/*
Namespace: RED
	Scoped to the RED Global Namespace
*/
var RED = window.RED || {

	require : function (module, args) {
		switch (module.toLowerCase()) {
		case "history" :
			if (RED.History) {
				RED.history = new RED.History(args);
			}
			break;
		
		default :
			throw "No module of that name found";
			break;
		}
	}

};
