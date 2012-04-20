// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// You should replace the namespace "wedding" with your own Site namespace, this is only an wedding.
var wedding = wedding || {};
	wedding.module = wedding.module || {};

// Site shell object
wedding.module.Shell = (function () {
	
	return wedding.module.Module.extend({
		vars : {},
		
		init : function () {
			this.setupHeader();
			this.setupFooter();
			
			this.sup();
		},

		setupHeader : function () {},
		
		setupFooter : function () {}

	});
	
}.call(wedding));
