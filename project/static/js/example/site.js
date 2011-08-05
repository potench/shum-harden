// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* site.js */

// ## The RED Namespace
var RED = RED || {};

// ## Local Namespace
// Example Site object, controls global functionality and instantiates the Example Default Page.
// You should replace the namespace "Example" with your own Site namespace, this is only an example.
var Example = Example || {};

// Site shell object

// Model manager and shell manager
RED.SITE = $.extend(true, Example, RED, (function () {
	
	return {
		
		models : {},
		
		init : function () {
			// Create the site shell
			this.models.Shell = new Example.Shell();
			
			// Wait for DOMContentLoaded
			$(document).ready(this.onReady.call(this));
		},
		
		createModel : function (page, vars) {
			var master = Example.Page,
			    model = (page && typeof master[page] === "function" ? master[page] : master);
			
			return this.models[page || "page"] = new model(vars);
		},
		
		getModel : function (page) {
			return this.models[page];
		},
		
		getModels : function () {
			return this.models;
		},
		
		onReady : function () {
			var body = $("body"),
			    // Use `attr("data-page-class")` if < jQuery 1.6
				pageClass = body.data("pageClass");
			
			// creates `Page()` based on `<div data-page-class="Home">`
			this.createModel(pageClass);
		}
	};
}()));