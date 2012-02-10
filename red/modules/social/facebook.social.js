// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* facebook.social.js */

// ## Local Namespace
var RED = RED || {};

RED.module = RED.module || {}; // note the use of lower case for package names now

RED.module.social = RED.module.social || {};


/**
 *	Requires DOM elements:
 *		<link rel="media_url">
 *		<meta property="og:app_id">
 *	Optional DOM elements: 
 *	<div id="fb-root"> // added for you if it doesn't exist
 *	data-custom-post="facebook" // fires customFacebookPost
 *
 *	Refer to http://yoast.com/social-buttons/ for more information on social-tracking-events
 */
(function () {
	
	var NAME = "Facebook";

	RED.module.social[NAME] = (function () {

		var pakage = this,
			EVENT = {
				POST : "custom-facebook-post"
			};


		return RED.Module.extend({

			vars : {},
			
			_media_url: null, // <link rel="media-url"' content="{{STATIC_URL}}" />
			_app_id : null, // <meta property="og:app_id" content="{{ FACEBOOK_APP_ID }} " />

			init : function () {

				pakage[NAME].EVENT = EVENT;
				
				this.loadJSDK();

				$('[data-custom-social="facebook"]').live("click", $.proxy(this.customFacebookPost, this));
				$(document).bind(EVENT.POST,  $.proxy(this.customFacebookPost, this));
			},

			onShare : function (e) {
				console.log("fb-onShare", e);
			},

			onAddComment : function (e) {
				console.log("fb-onAddComment", e);
			},

			onSesionChange : function (e) {
				console.log("fb-onSesionChange", e);	
			},

			onStatusChange : function (e) {
				console.log("fb-onStatusChange", e);	
			},

			onLogin : function (e) {
				console.log("fb-onLogin", e);	
			},

			// parse the URL to run like-specific callbacks
			onLike : function (URL) {
				// the following is SPECIFC to toyota sharathon - no time to abstract further sorry!
				if (URL.indexOf("seed") > 0) { // from profile page
					// tracking
					console.log("fb-onLike", "profile");
				} else { // bottom of page
					// tracking
					console.log("fb-onLike", "other");
				}
			},

			onRender : function () {
				console.log("fb-onRender");	
				//FB.Event.unsubscribe('xfbml.render',this.onRender); // unregister
			},

			//	add [data-custom-social="facebook"] to a link to automatically fire this
			//	publishobject reads from meta tags in the link and defaults to the og:meta in the <head>
			//
			//	EXAMPLE
			//	<a
			//		data-custom-social-="facebook"						// REQUIRED
			//		data-origin="http://example.com"					// optional 
			//		data-method="stream.publish"						// optional
			//		data-attachment-name="Some Name"					// optional
			//		data-attachment-caption="Some Caption"				// optional
			//		data-attachment-description="Some Description"		// optional
			//		data-attachment-media-type="image"					// optional
			//		data-attachment-media-src=""						// optional
			//		data-attachment-media-href=""						// optional
			//		data-action-text="Some ActionText"					// optional
			//		data-action-href=""									// optional
			//	>Facebook</a>
			//
			//	Also, you can $.trigger() a "custom-facebook-post" event after a click optionall run customFacebookPost
			//
			//	Example
			//	$("body").trigger("custom-facebook-post", {origin:"http://example.com", attachmentName : "Some Name"})
			//
			customFacebookPost : function (e, eData) {
				
				var el = $(e.currentTarget),
					data = eData || el.data(),
					publishObj = this.getPublishObj(data);

				FB.ui(publishObj);

				return data;
			},

			getPublishObj : function (data) {
				return ({
					method : data.method || "stream.publish",
					origin : data.origin || $('meta[property="og:url"]').attr("content"),
					attachment : {
						name : data.attachmentName || $('meta[property="og:title"]').attr("content"),
						caption : data.attachmentCaption || $('meta[property="og:description"]').attr("content"),
						description : data.attachmentDescription || "",
						media : [{
							type : data.attachmentMediaType || "image",
							src : data.attachmentMediaSrc || $('meta[property="og:image"]').attr("content"),
							href : data.attachmentMediaHref || $('meta[property="og:url"]').attr("content")
						}]
					},
					action_links : [{
						text : data.attachmentActionText || "Click Here",
						href : data.attachmentActionText || $('meta[property="og:url"]').attr("content")
					}]
				});
			},

			fbAsyncInit : function () {

				FB.Event.subscribe('comments.add', $.proxy(this.onAddComment, this));
				FB.Event.subscribe('auth.sessionChange', $.proxy(this.onSesionChange, this));
				FB.Event.subscribe('auth.statusChange', $.proxy(this.onStatusChange, this));
				FB.Event.subscribe('auth.login', $.proxy(this.onLogin, this));
				FB.Event.subscribe('edge.create', $.proxy(this.onLike, this));
				FB.Event.subscribe('xfbml.render', $.proxy(this.onRender, this));

				FB.init({
					appId      : this._app_id, // App ID
					channelUrl : this._media_url + '/js/red/modules/social/facebook-channel.html', // Channel File
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					oauth      : true, // enable OAuth 2.0
					xfbml      : true  // parse XFBML
				});
			},


			loadJSDK : function () {
				
				if (!$("#fb-root").length) {
					$("body .scripts").append($('<div id="fb-root">'));
				}

				this._media_url = $('link[rel="media-url"]').attr("href");
				this._app_id = $('meta[property="og:app_id"]').attr("content");

				if (!this._media_url) {
					throw 'red/modules/social/Facebook.js requires a rel="media-url"';
				}

				if (!this._app_id) {
					// Create FB developer account, create a new app, set the URL of the app to http://localhost:8000 for testing
					throw 'red/modules/social/Facebook.js requires meta og:app_id.';
				}

				window.fbAsyncInit = $.proxy(this.fbAsyncInit, this);

				// Load the SDK Asynchronously
				(function (d) {
					var js, 
						id = 'facebook-jssdk'; 
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement('script'); 
					js.id = id;
					js.async = true;
					js.src = "//connect.facebook.net/en_US/all.js";
					d.getElementsByTagName('head')[0].appendChild(js);
				}(document));
			}

		});
		
	}.call(RED.module.social));
}());