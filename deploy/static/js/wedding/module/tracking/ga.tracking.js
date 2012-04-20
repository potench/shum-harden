// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* facebook.social.js */

// ## Local Namespace
var wedding = wedding || {};

wedding.module = wedding.module || {}; // note the use of lower case for package names now

wedding.module.tracking = wedding.module.tracking || {};


/**
 * This extends() the RED.module.social.Facebook class in order to add custom tracking events
 * 
 */
(function () {
	
	wedding.module.tracking.GA = (function () {

		return wedding.module.tracking.GA.extend({
			
			vars : {
				debug : false
			},

			init : function (vars) {
				this.sup.call(this, vars);

				$('a[href]').live("click", $.proxy(this.autoLinkTracking, this));
				$('a[data-modal]').live("click", $.proxy(this.modalLinkTracking, this));
			},

			modalLinkTracking : function (e) {
				var targ = $(e.currentTarget),
					id = targ.data("modal");

				$.publish("track", [{type: "event", category: "modal", action: "request-inline", label: id + ": " + this.getPath() }]);
			},

			getPath : function () {
				var state = History.getState();
				state = state.title || state.data.url || window.location.pathname;
				return state;
			},

			autoLinkTracking : function (e) {
				var targ = $(e.currentTarget),
					url = targ.attr("href"),
					category = (targ.data("history")) ? "link-interior" : "link-exterior";

				$.publish("track", [{type: "event", category: category, action: "from: " + this.getPath(), label: "to: " + url }]);
			},

			destroy : function () {
				$('[data-tracking]').die("click", $.proxy(this.autoLinkTracking, this));
				this.sup.call(this);
			}

		});
		
	}.call(wedding.module.tracking));
}());