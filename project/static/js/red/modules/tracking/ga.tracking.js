// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
// Google Analytics Tracking
/* ga.tracking.js */ 

// ## Local Namespace
var RED = RED || {};

RED.module = RED.module || {};

RED.module.tracking = RED.module.tracking || {};

var _gaq = _gaq || [];

/**
 * Omniture and GA tracking event wrappers
 */
(function () {
	
	RED.module.tracking.GA = (function () {

		return RED.Module.extend({

			vars : {
				property_id : "", // init({property_id: "XXXXX"}) OR (preferably) <meta property="ga:property_id" content="XXXXX"/>
				domain : ""
			},

			init : function () {
				this.loadJSDK();
			},

			track : function (e, eData) {
				
				var el = $(e.currentTarget),
				data = eData || el.data();

				//console.log("ga.tracking", data.category, data);

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

				_gaq.push(["_setAccount", this.vars.property_id]);
				_gaq.push(['_setDomainName', this.vars.domain]);
				_gaq.push(['_setAllowLinker', true]);
				_gaq.push(["_trackPageview"]);
				_gaq.push(["_trackPageLoadTime"]);

				Modernizr.load({
					load : ("https:" === location.protocol ? "//ssl" : "//www") + ".google-analytics.com/ga.js"
				});
			}

		});
	}.call(RED.module.tracking));

}());