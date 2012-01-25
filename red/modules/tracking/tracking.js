// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* tracking.js */

// ## Local Namespace
var RED = RED || {};

RED.module = RED.module || {};


/**
 * Omniture and GA tracking event wrappers
 *
 * EXAMPLE:
	var MyTracking = new RED.module.Tracking([
		{	
			className:"Omniture",  // configure to use omniture
			config : [
				["tmsdevtoyota","ec2devtoyotashareathon1.toyota.com"],
				["tmsdevtoyota","staging.toyota.com"]
			]
		},
		{
			className: "GA"
		}
	]);

 */
(function () {
	
	var NAME = "Tracking";

	RED.module[NAME] = (function () {

		var pakage = this, // "package" is reserved so using "pakage"
			EVENT = {		// static event strings
				TRACK : "track" // $.trigger(Example.module.Tracking.EVENT.TRACK); or $.trigger("track")
			};
		
		return RED.Module.extend({
			
			models : {},

			init : function (trackers) {
				var i,
					className,
					Model;

				pakage[NAME].EVENT = EVENT; // event constants

				for (i = trackers.length - 1; i >= 0; i--) {
					className = (typeof trackers[i] === "string") ? trackers[i]  : trackers[i].className;
					Model = pakage.tracking[className];

					if (Model && typeof Model === "function") {
						this.models[className] = new Model(trackers[i]);
					} else {
						throw ("red/modules/tracking: No tracking module named " + className + " in package " + pakage.tracking);
					}
				}

				$(document).bind(EVENT.TRACK, $.proxy(this.track, this));
			},

			track : function (e, data) {
				var i;
				for (i in this.models) {
					if (this.models.hasOwnProperty(i)) {
						this.models[i].track(e, data);
					}
				}
			}
		});
	}.call(RED.module));

}(RED.module));