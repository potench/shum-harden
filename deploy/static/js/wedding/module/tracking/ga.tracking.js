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
			},

			// a human readable hash for where the user is on the site (URL or title or pageClass)
			getPath : function () {
				var state = $("body").data("pageClass") || window.location.pathname;
				return state;
			},

			autoLinkTracking : function (e) {
				var targ = $(e.currentTarget),
					url = targ.attr("href"),
					category = (targ.data("section")) ? "link-interior" : "link-exterior";

				$.publish("track", [{type: "event", category: category, action: "from: " + this.getPath(), label: "to: " + url }]);
			},

			destroy : function () {
				$('[data-tracking]').die("click", $.proxy(this.autoLinkTracking, this));
				this.sup.call(this);
			}

		});
		
	}.call(wedding.module.tracking));
}());