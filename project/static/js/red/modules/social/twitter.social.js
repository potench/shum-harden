// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## Local Namespace

var red = red || {};

red.module = red.module || {};

red.module.social = red.module.social || {};


/**
 *	Requires DOM elements:
 *		<link rel="media_url">
 *		<meta property="og:app_id">
 *		<div id="fb-root">
 *	Refer to http://yoast.com/social-buttons/ for more information on social-tracking-events
 *
 *	add [data-custom-social="twitter"] to automatically fire customTweet()
 *
 *	EXAMPLE
 *	<a 
 *		data-custom-social-="twitter"						// REQUIRED
 *		data-url="http://example.com"						// optional 
 *		data-text="Some tweet you are sending"				// optional
 *	>Twitter</a>
 *
 *	Also, you can $.trigger() a "custom-twitter-post" event to fire customTweet()
 *
 *	Example
 *	$("body").trigger("custom-twitter-post", {url:"http://example.com", text : "Some Tweet Message"})
 *
 */
(function () {

	var NAME = "Twitter";

	red.module.social[NAME] = (function () {

		var pakage = this,
			EVENT = {
				POST : "custom-twitter-post"
			};
		
		return red.Module.extend({

			_twitter_url : "https://twitter.com/share?",

			
			init : function () {

				pakage[NAME].EVENT = EVENT;

				this.loadJSDK();

				$('[data-custom-social="twitter"]').live("click", $.proxy(this.customTweet, this));
				$(document).bind(EVENT.POST,  $.proxy(this.customTweet, this));
			},

			onTweet: function (e, eData) {
				var el = $(e.currentTarget),
					data = eData || e.data();
				console.log("onTweet", e, data); // you can use eData to set up different tracking calls
				return data;
			},

			onFollow: function (e, eData) {
				console.log("onFollow", e);
			},

			customTweet : function (e, eData) {

				var el = $(e.currentTarget),
					data = eData || el.data(),
					url = this._twitter_url,
					i;
				
				data.url = data.url || window.location.href;
				data.text = data.text || document.title;

				for (i in data) {
					if (typeof(data[i]) === 'string') {
						url += "&" + i + "=" + encodeURIComponent(data[i]);
					}
				}

				window.open(url, 'sharer', 'toolbar=0,status=0,scrollbars=1,width=575,height=338');

				// fires onTweet
				this.onTweet(e, eData);

			},

			loadJSDK : function () {
				
				////////////////////////////////////////////////////////////
				/////// TWITTER SHARING and tracking
				// Load G+1
				var e = document.createElement('script');
				e.type = "text/javascript";
				e.async = true;
				e.src = 'http://platform.twitter.com/widgets.js';
				document.getElementsByTagName('head')[0].appendChild(e);

				$(e).load($.proxy(function () {
					if (window.twttr) {
						window.twttr.events.bind('tweet',   $.proxy(this.onTweet, this));
						window.twttr.events.bind('follow', $.proxy(this.onFollow, this));	
					}
				}, this));
			}
		});
		
	}.call(red.module.social));
}());