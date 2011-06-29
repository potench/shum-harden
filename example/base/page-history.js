// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* page.js */

// ## Local Namespace

// An enhanced Page Class for History API functionality for the "Example" website.
// New pages will try to load a specialized class ("Home" for instance),
// if one cannot be found, the site will instantiate this Page by default

// Site-specifc namespace
var Example = Example || {};

Example.Page = (function () {
	
	return Example.Page.extend({
		
		// Expose a history boolean
		history : true,
		
		vars : {
			
			// Define the ID of the target HTML block in your Ajax call
			// jQuery will load the entire page via Ajax but only return the targetted markup
			// TODO: Work with backend to achieve this on the server side
			targetID : "#history-target",
			
			// When no state is defined (i.e., the index page), use this as the default state
			defaultState : "Home"
		},
		
		// Default page level functionality
		init : function () {
			
			// Call to set global DOM references
			this.setDOMReferences();
			
			// No History API? No fancy effects!
			if (!!!(window.history && history.pushState)) {
				this.load();
			}
		},
		
		// Load is called after animation and page load completes
		load : function () {
			this.setDOMReferences();
		},
		
		// Set global DOM references
		// These will not be included during teardown
		// TODO: Stop this function from firing twice in some scenarios
		setDOMReferences : function () {
			$.extend(this.vars, {
				body : $(document.body)
			});
		},
		
		// DOM references to be set on class instantiation and reload
		// These references are removed during teardown
		setLocalDOMReferences : function (vars) {
			this.vars.localDOMReferences = vars;
			$.extend(this.vars, vars);
		},
		
		// Removes all local DOM references
		removeLocalDOMReferences : function () {
			var locals = this.vars.localDOMReferences,
			    key;
			
			for (key in locals) {
				if (locals.hasOwnProperty(key)) {
					delete this.vars[key];
				}
			}
			
			delete this.vars.localDOMReferences;
		},
		
		// Animates the new page in
		// TIP: CSS Animations are a great way to handle this
		intro : function (target) {
			var page = this.vars.body.data("pageClass"),
			    model = Example.getModel(page),
			    content, state;
			
			if (target) {
				content = $(this.vars.html).find(this.vars.targetID);
				state = this.vars.state;

				target.replaceWith(content);

				delete this.vars.html;

				this.introAnimation(content).then(function () {
					model.load.call(model);
				});
			} else {
				model.load.call(model);
			}
		},
		
		// Your page intro animation goes here!
		// NOTE: Your animation *must* have a callback that returns the jQuery deferred object
		introAnimation : function (content) {
			var dfd = $.Deferred();
			
			// Sample animation:
			content.fadeOut(0).fadeIn(500, function () {
				// Do custom stuff on callback
				
				// Resolve the deferred task!
				return dfd.resolve();
			});
			
			// Return a promise to resolve the deferred task
			return dfd.promise();
		},
		
		// Animates the old page out
		outro : function (dfd) {
			var content = $(this.vars.targetID);
			
			this.outroAnimation(content).then(function () {
				dfd.resolve(content);
			});
		},
		
		// Your page outro animation goes here!
		// NOTE: Your animation *must* have a callback that returns the jQuery deferred object
		outroAnimation : function (content) {
			var dfd = $.Deferred();
			
			// Sample animation:
			content.fadeOut(500, function () {
				// Do custom stuff on callback
				
				// Resolve the deferred task!
				return dfd.resolve();
			});
			
			// Return a promise to resolve the deferred task
			return dfd.promise();
		},
		
		getCurrentPage : function () {
			var page, path;
			
			if (this.vars.state && this.vars.state.data.state) {
				page = this.vars.state.data.state;
			} else {
				path = window.location.pathname.split("/");
				
				if (path && path[1]) {
					page = path[1].charAt(0).toUpperCase() + path[1].slice(1);
				} else {
					// Default
					page = this.vars.defaultState;
				}
			}
			
			return page;
		},
		
		setup : function (state) {
			var oldPageClass = this.vars.body.data("pageClass"),
			    newPageClass = state.data.state;
			
			// Store state
			this.vars.state = state;
			
			if (oldPageClass !== newPageClass) {
				$.get(state.url, $.proxy(function (html) {
					this.vars.html = html;
					this.teardown(oldPageClass).then($.proxy(this.intro, this));
				}, this));
			} else {
				this.intro();
			}

			// Flag new data-page-class
			this.vars.body.addClass(newPageClass.toLowerCase());
			this.vars.body.data("pageClass", newPageClass);
		},
		
		teardown : function (oldPageClass) {
			var dfd = $.Deferred(),
			    oldModel = Example.getModel(oldPageClass);
			
			if (oldModel) {
				oldModel.outro.call(oldModel, dfd);
				oldModel.removeLocalDOMReferences.call(oldModel);
			}
			
			// Remove class
			this.vars.body.removeClass(oldPageClass.toLowerCase());
			
			return dfd.promise();
		},
		
		refresh : function (state) {
			// Set default state
			if (!state.data.state) {
				state.data.state = this.getCurrentPage();
			}
			
			var page = state.data.state,
			    model = Example.getModel(page);
			
			if (!model) {
				model = Example.createModel(page, {
					triggered : true
				});
				
				model.refresh.call(model, state);
			} else {
				if (!this.vars.body.hasClass(page.toLowerCase())) {
					model.setup.call(model, state);
				}
			}
		}
		
	});
}.call(Example));
