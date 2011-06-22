// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The RED Namespace
var RED = RED || {};

// ## Local Namespace
// Example Site object, controls global functionality and instantiates the Example Default Page.
// You should replace the namespace "Example" with your own Site namespace, this is only an example.
var Example = Example || {};

// Site shell object
Example.Shell = (function () {
	
	// <this scope="RED">
	// </this>
	
	// <this scope="Example.Shell">
	
	return Example.Page.extend({
		vars : {},
		
		/*
		Function: Example.Shell.scope
		*/
		init : function () {
			this.setupHeader();
			this.setupFooter();
			
			this.sup();
		},

		setupHeader : function () {},
		
		setupFooter : function () {}

	});
	
	// </this>
	
}.call(RED));
