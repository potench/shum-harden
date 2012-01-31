// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The RED Namespace
var RED = RED || {};

// ## Local Namespace
// You should replace the namespace "Example" with your own Site namespace, this is only an example.
var Example = Example || {};

// Site shell object
Example.Shell = (function () {
	
	return Example.Page.extend({
		vars : {},
		
		init : function () {
			this.setupHeader();
			this.setupFooter();
			
			this.sup();
		},

		setupHeader : function () {},
		
		setupFooter : function () {}

	});
	
}.call(RED));
