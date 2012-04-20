// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* omniture.tracking.js */

// ## Local Namespace
var red = red || {};

red.module = red.module || {};

red.module.tracking = red.module.tracking || {};


/**
 * Omniture and GA tracking event wrappers
 * REQUIRES 
	- tracking.js
	- ssla-analytics/  (this file loads ssla-analytics/analytics.min.js)
 * read instructions for use in tracking.js

 */
(function () {
	
	red.module.tracking.Omniture = (function () {

		return red.Module.extend({
			

			_tracker : null,

			vars : {
				debug : true, // set to false for production
				media_url : null //defaults to <link rel="media-url"' content="{{STATIC_URL}}" />
			},

			log : function () {
				if (this.vars.debug) {
					try {
						console.log(arguments);
					} catch (e) {}
				}
			},


			init : function () {
				this.loadJSDK();

				$.subscribe("track", $.proxy(this.track, this));
			},

			track : function (e, data) {
				this.log("o track is not setup yet =(", data.type, data);

			},

			onReady : function () {
				var i,
					account;

				this.tracker = new window.ssla.analytics.Omniture({}, window.s); // pass in an optional Library object

				if (this.vars.accounts) { // set account relationships passed in init()
					for (i = this.vars.accounts.length - 1; i >= 0; i--) {
						account = this.vars.accounts[i];
						window.ssla.analytics.Omniture.addAccount(account[0], account[1]);
					}
				}
			},

			loadJSDK : function () {

				this.vars.media_url = this.vars.media_url || $('link[rel="media-url"]').attr("href");

				if (!this.vars.media_url) {
					throw "tracking:Omniture missing MEDIA_URL";
				}

				Modernizr.load([{
					load : [
						this.vars.media_url + "js/red/modules/tracking/ssla-analytics/analytics.min.js"
						/*this.vars.media_url + "js/red/modules/tracking/ssla-analytics/source/analytics.js",
						this.vars.media_url + "js/red/modules/tracking/ssla-analytics/source/s_code.js"*/
					],
					complete : $.proxy(this.onReady, this)
				}]);
			},

			destroy : function () {
				$.unsubscribe("track", $.proxy(this.track, this));
				
				this.tracker = null;
				this.vars = null;
			}

		});
	}.call(red.module.tracking));

}());