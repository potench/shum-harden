// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* home.js */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var example = example || {};

// Page namespace
example.page = example.page || {};
	
// Home specific instance
example.page.Home = (function () {
	
	// Extends example.Page
	return example.Page.extend({
		
		// Over-writeable vars, ex:
		// 
		//  var foo = new Page({
		//      x : 10
		//  });
		vars : {
			// Results in `{ x : 1, y : 2 }` by inheriting from `example.Page`
			z : 3
		},
		
		// Home  page level functionality
		init : function () {}
		
	});
}.call(example));
