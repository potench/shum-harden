// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* social.js */

// ## Local Namespace
var red = red || {};

red.module = red.module || {};


/**
 * Requires DOM elements:
 *		<link rel="media_url">
 *		<meta property="og:app_id">
 *		<div id="fb-root">
 * Refer to http://yoast.com/social-buttons/ for more information on social-tracking-events
 */
red.module.Social = (function () {
	
	return red.Module.extend({
		
		models : {},

		init : function (networks) {
			var i;

			for (i = networks.length - 1; i >= 0; i--) {
				if (red.module.social[networks[i]]) {
					this.models[networks[i]] = new red.module.social[networks[i]]();
				} else {
					throw ("no social module named " + networks[i]);
				}
			}
		}
	});
	
}.call(red));
