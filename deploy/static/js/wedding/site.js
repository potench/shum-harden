// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* site.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// Site object, controls global functionality and instantiates the Default Page.
// You should replace the namespace "wedding" with your own Site namespace, this is only an wedding.
var wedding = wedding || {};

// Site shell object

// Model manager and shell manager
red.Site = $.extend(true, wedding, red, (function () {
	
	var defaultPage = "Page";

	return {
		
		models : {},
		
		init : function () {
			// Create the site shell
			this.models.Shell = new this.module.Shell();
			this.models.GATracking = new this.module.tracking.GA();
			
			// Wait for DOMContentLoaded
			$(document).ready(this.onReady.call(this));
		},

		setMediaURL : function () {
			red.SYS = red.SYS || {};
			red.SYS.MEDIA_URL = $("link[rel='media-url']").attr("href");
		},
		
		createModel : function (page, vars) {
			var master = this.page,
				Model = (page && typeof master[page] === "function" ? master[page] : master[defaultPage]);
			
			return (this.models[page || "page"] = new Model(vars));
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
			this.setMediaURL();
			this.createModel(pageClass);
		}
	};
}()));