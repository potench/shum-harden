/*
File: ticker.js

About: Version
	1.0

Project: RED

Description:
	Creates a countdown ticker

Usage:
	var ticker = new RED.Ticker({
		now : new Date(),
		start : "Sun Jun 12 11:25:00 2011",
		end : "Mon Jun 13 11:45:00 2011"
	});

	ticker.bind("start", function () {
		// on start
	});

	ticker.bind("tick", function (hours, minutes, seconds) {
		console.log(hours, minutes, seconds);
	});

	ticker.bind("complete", function () {
		// on complete
	});

Requires:
	- jQuery <http://jquery.com/>

Requires:
	- <class.js>
	- <site.js>
	- <page.js>

*/

/*global $: true, console: true, Class: true */

/*
Class: RED
	Under the RED Class
*/
var RED = RED || {};

/*
Class: RED.Ticker
	@extends RED
*/
RED.Ticker = (function () {
	
	// <this scope="RED">
	// </this>
	
	// <this scope="RED.Ticker">
	
	return RED.Class.extend({
		
		// now, start & end should be Date-parseable formats.
		// See: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
		vars : {
			now : null,
			start : null,
			end : null
		},

		init : function () {
			this.setupTicker();
		},
		
		setupTicker : function () {
			this.vars.currentTime = this.parseTime(this.vars.now);
			this.vars.startTime = this.parseTime(this.vars.start);
			this.vars.endTime = this.parseTime(this.vars.end);

			this.vars.timeInSeconds = Math.round((this.vars.endTime - this.vars.currentTime) / 1000);

			this.startTicker();
		},

		updateTicker : function () {
			this.vars.time = this.getPrettyTime();
			
			if (Math.max.apply(this, this.vars.time) <= 0) {
				this.stopTicker("complete");
			} else if (this.vars.currentTime >= this.vars.startTime) {
				if (!this.vars.startFired) {
					this.fireEvent("start");
					this.vars.startFired = true;
				}
				
				this.fireEvent("tick", this.vars.time);
			}
		},

		parseTime : function (date) {
			return new Date(date).getTime();
		},

		getPrettyTime : function () {
			var hours, minutes, seconds;

			this.vars.currentTime += 1000;
			this.vars.timeInSeconds = Math.round((this.vars.endTime - this.vars.currentTime) / 1000);

			seconds = this.leadingZero(this.vars.timeInSeconds % 60);
			minutes = this.leadingZero(Math.floor(this.vars.timeInSeconds / 60) % 60);
			hours = this.leadingZero(Math.floor(this.vars.timeInSeconds / 60 / 60) % 60);

			return [hours, minutes, seconds];
		},

		leadingZero : function (time) {
			var timeString = time;

			if (time < 10 && time >= 0) {
				timeString = "0" + time.toString();
			}

			return timeString;
		},

		startTicker : function () {
			// Do every second
			this.vars.ticker = window.setInterval(this.delegate(this, this.updateTicker), 1000);

			// Jump start
			window.setTimeout(this.delegate(this, function () {
				this.updateTicker();
			}), 10);
		},

		stopTicker : function (event) {
			if (this.vars.ticker) {
				window.clearInterval(this.vars.ticker);
				delete this.vars.ticker;
			}
			
			this.fireEvent(event);
		},

		bind : function (type, method) {
			this.vars.events = this.vars.events || {};
			this.vars.events["on" + type] = this.vars.events["on" + type] || [];
			this.vars.events["on" + type].push(method);
		},

		fireEvent : function (type, args) {
			if (!this.vars.events) {
				return;
			}

			var events = this.vars.events["on" + type], i, j;
			
			if (events.length) {
				for (i = 0, j = events.length; i < j; i++) {
					events[i].apply(this, args || []);
				}
			}
		}

	});
	
	// </this>
	
}.call(RED));
