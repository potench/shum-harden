// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// You should replace the namespace "example" with your own Site namespace, this is only an example.
var example = example || {};

// Site shell object
example.Shell = (function () {
	
	return example.Page.extend({
		vars : {},
		
		init : function () {
			this.setupHeader();
			this.setupFooter();
			
			this.sup();
		},

		setupHeader : function () {},
		
		setupFooter : function () {}

	});
	
}.call(red));
