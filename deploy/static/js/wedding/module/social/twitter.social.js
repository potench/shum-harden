
// ## Local Namespace
var wedding = wedding || {};

wedding.module = wedding.module || {}; // note the use of lower case for package names now

wedding.module.social = wedding.module.social || {};


/**
 * This extends() the RED.module.social.Facebook class in order to add custom tracking events
 * 
 */
(function () {
	
	wedding.module.social.Twitter = (function () {
		
		var EVENTS = {
			LOGIN : "social/twitter/login",
			LOGOUT : "social/twitter/logout",
			GET_STATUS : "social/twitter/get-status",
			POST_STATUS : "social/twitter/post-status"
		};

		return wedding.module.social.Twitter.extend({

			init : function (vars) {
				this.sup.call(this, vars);
			},

			onTwitterInit : function () {
				this.sup.call(this);

				$.subscribe(EVENTS.LOGOUT, $.proxy(this.getLogout, this));

				if (window.twttr) {
					var that = this;

					window.twttr.anywhere((function (T) {  
						$.subscribe(EVENTS.LOGIN, function (e) {
							T.signIn();
						});

						T.bind("authComplete", function (e, user) {
							that.onAuthComplete(e, user);
						});

						T.bind("signOut", function (e) {
							that.onSignOut(e);
						});


						$.subscribe(EVENTS.POST_STATUS, function (e, data) {
							if (T.isConnected()) {
								T.Status.update(data.text); 
							} else {
								that.customTweet(e, data);
							}
						});

						$.subscribe(EVENTS.GET_STATUS, function (e) {
							if (T.isConnected()) {
								that.onAuthComplete(null, T.currentUser)
							} else {
								that.onSignOut();
							}
						});
					}));
				}
			},

			onAuthComplete : function (e, eData) {
				$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleTwitterLogin", eData]);
			},

			onSignOut : function (e) {
				$.publish(wedding.module.Unity.SEND_MESSAGE, ["HandleTwitterLogout"]);
			},

			getLogout : function (e) {
				if (window.twttr) {
					window.twttr.anywhere.signOut();
				}
			},

			destroy : function () {
				this.sup.call(this);
			}

		}, EVENTS);
		
	}.call(wedding.module.social));
}());