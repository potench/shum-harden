// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* about.js */

// ## Local Namespace

// About Page class

// Site-specifc namespace
var example = example || {};

// Page namespace
example.Page = example.Page || {};
	
// About specific instance
example.Page.About = (function () {
	
	return example.Page.extend({
		
		// Over-writeable vars, ex:
		// 
		//  var foo = new Page({
		//      x : 10
		//  });
		vars : {
			x : 100,
			// Results in `{ x : 1, y : 2 }` by inheriting from `example.Page`
			y : 3,
			z : 4
		},
		
		// About  page level functionality
		init : function (vars) {}
		
	});
}.call(example));
