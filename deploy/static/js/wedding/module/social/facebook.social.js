
// ## Local Namespace
var wedding = wedding || {};

wedding.module = wedding.module || {}; // note the use of lower case for package names now

wedding.module.social = wedding.module.social || {};


/**
 * This extends() the RED.module.social.Facebook class in order to add custom tracking events
 * 
 */
(function () {

	wedding.module.social.Facebook = (function () {

		var EVENTS = {
			LOGIN : "social/facebook/login",
			LOGOUT : "social/facebook/logout",
			GET_STATUS : "social/facebook/get-status"
		};

		return wedding.module.social.Facebook.extend({

			init : function (vars) {
				this.sup.call(this, vars);
			},

			customFacebookPost : function (e, eData) {
				var el = $(e.currentTarget),
					data = eData || el.data(),
					publishObj = this.getPublishObj(data),
					post = {
						'message' : eData.attachmentCaption,
						'link' : eData.attachmentMediaHref,
						'source' : eData.attachmentMediaSrc
					};

				this.ifLoggedInRun($.proxy(function () {
					FB.api('/me/feed', 'post', post, function(response) {
						if (response && !response.error) {
							$.publish("track", [{type : "event", category : "facebook", action : "on-post", label : data.origin}]);
						}
					});
				}, this))

				return data;
			},

			// get current facebook login status when page loads
			onFBInit : function () {
				this.sup.call(this);

				$.subscribe(EVENTS.LOGIN, $.proxy(this.getLogin, this));
				$.subscribe(EVENTS.LOGOUT, $.proxy(this.getLogout, this));
				$.subscribe(EVENTS.GET_STATUS, $.proxy(this.getStatus, this));

				this.getStatus();
			},

			ifLoggedInRun : function (callback) {
				FB.getLoginStatus(function (response) {
					if (response.status === "connected") {// user has a session, make sure they are "FULLY REGSITERED"
						callback();
					}
				});
			},


			getStatus : function () {
				FB.getLoginStatus(function (response) {
					if (response.session) {// user has a session, make sure they are "FULLY REGSITERED"
						$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleFacebookLogin", response]);					
					} else {
						$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleFacebookLogout", response]);
					}
				});
			},

			getLogout : function () {
				FB.logout(function (response) {
					$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleFacebookLogout", response]);
				});
			},

			getLogin : function () {
				FB.login(function (response) {
					if (response.authResponse) {
						$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleFacebookLogin", response]);
					} else {
						$.publish("track", [{type : "event", category: "facebook", action : "canceled-login", label : "user canceled login"}]);
					}
				}, {scope: 'publish_actions'});
			},

			destroy : function () {
				this.sup.call(this);
			}

		}, EVENTS);
		
	}.call(wedding));
}());