// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
// Google Analytics Tracking
/* ga.tracking.js */ 

// ## Local Namespace
var red = red || {};

red.module = red.module || {};

red.module.tracking = red.module.tracking || {};

var _gaq = _gaq || [];

/**
 * Omniture and GA tracking event wrappers
 * REQUIRES tracking.js
 * read instructions for use in tracking.js
 */
(function () {
	
	red.module.tracking.GA = (function () {

		return red.Module.extend({

			vars : {
				debug : true,
				property_id : "", // init({property_id: "XXXXX"}) OR (preferably) <meta property="ga:property_id" content="XXXXX"/>
				domain : ""
			},

			init : function () {
				this.loadJSDK();

				$.subscribe("track", $.proxy(this.track, this));
			},

			log : function () {
				if (this.vars.debug) {
					try {
						console.log(arguments);
					} catch (e) {}
				}
			},

			track : function (e, eData) {				
				var el = $(e.currentTarget),
				data = eData || el.data();

				data.type = data.type || "event"; // default to an event tracking type

				this.log("ga track", data.type, data);

				switch (data.type) {
				case 'event':
					_gaq.push(['_trackEvent', data.category, data.action, data.label, data.value]);
					break;
				case 'social':
					console.log("Tracking: GA social (not hooked up yet)::", data);
					//_gaq.push(['_trackSocial', network, socialAction, opt_target, opt_pagePath]);
					break;
				default:
				case 'page':
					_gaq.push(['_trackPageview', data.url || window.location.hash ]);
					break;
				}
			},

			loadJSDK : function () {
				var _gaq = window._gaq = window._gaq || [];

				this.vars.property_id = this.vars.property_id || $('meta[property="ga:property_id"]').attr("content");
				this.vars.domain = this.vars.domain || $('meta[property="ga:domain"]').attr("content");

				if (!this.vars.property_id) {
					throw 'tracking:GA missing PROPERTY_ID <meta property="ga:property_id" content="UA-XXXXXX-X"/>';
				}

				if (!this.vars.domain) {
					throw 'tracking:GA missing DOMAIN  <meta property="ga:domain" content="xxxxx.com"/>';
				}

				this.log("ga.tracking:: " + this.vars.property_id);

				_gaq.push(["_setAccount", this.vars.property_id]);
				_gaq.push(['_setDomainName', this.vars.domain]);
				_gaq.push(['_setAllowLinker', true]);
				_gaq.push(["_trackPageview"]);
				_gaq.push(["_trackPageLoadTime"]);

				Modernizr.load({
					load : ("https:" === location.protocol ? "//ssl" : "//www") + ".google-analytics.com/ga.js"
				});
			},

			destroy : function () {
				$.unsubscribe("track", $.proxy(this.track, this));
				this.vars = null;
			}

		});
	}.call(red.module.tracking));
}());