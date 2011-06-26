// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* ticker.js */

// The RED Namespace
var RED = RED || {};

// ## RED.Ticker
// Creates a countdown ticker.
// 
// Usage:
// 
//  var ticker = new RED.Ticker({
//      now : new Date(),
//      start : "Sun Jun 12 11:25:00 2011",
//      end : "Mon Jun 13 11:45:00 2011"
//  });
// 
//  ticker.bind("start", function () {
//      // on start
//  });
// 
//  ticker.bind("tick", function (hours, minutes, seconds) {
//      console.log(hours, minutes, seconds);
//  });
// 
//  ticker.bind("complete", function () {
//      // on complete
//  });
RED.Ticker = (function () {
	
	// Extends RED.Module
	return RED.Module.extend({
		
		// now, start & end should be [Date-parseable formats](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date).
		vars : {
			now : null,
			start : null,
			end : null
		},

		init : function (vars) {
			this.setupTicker();
		},
		
		// Parse initial dates, start the ticker
		setupTicker : function () {
			this.vars.currentTime = this.parseTime(this.vars.now);
			this.vars.startTime = this.parseTime(this.vars.start);
			this.vars.endTime = this.parseTime(this.vars.end);

			this.vars.timeInSeconds = Math.round((this.vars.endTime - this.vars.currentTime) / 1000);

			this.startTicker();
		},

		// Runs every second. Updates the ticker based on source/destination dates.
		
		// If time has run out, stop the ticker.
		
		// Else if current time is greater than or equal to start time, tick.
		updateTicker : function () {
			this.vars.time = this.getPrettyTime();
			
			if (Math.max.apply(this, this.vars.time) <= 0) {
				this.stopTicker("complete");
			} else if (this.vars.currentTime >= this.vars.startTime) {
				if (!this.vars.startFired) {
					this.trigger("start");
					this.vars.startFired = true;
				}
				
				this.trigger("tick", this.vars.time);
			}
		},

		// Returns a new Date object based on time passed in.
		parseTime : function (date) {
			return new Date(date).getTime();
		},

		// Format time in a human readable array.
		// 
		// Ex:
		// 
		//  ["01", "13", "52"] // 1:13:52 remaining
		getPrettyTime : function () {
			var hours, minutes, seconds;

			this.vars.currentTime += 1000;
			this.vars.timeInSeconds = Math.round((this.vars.endTime - this.vars.currentTime) / 1000);

			seconds = this.leadingZero(this.vars.timeInSeconds % 60);
			minutes = this.leadingZero(Math.floor(this.vars.timeInSeconds / 60) % 60);
			hours = this.leadingZero(Math.floor(this.vars.timeInSeconds / 60 / 60) % 60);

			return [hours, minutes, seconds];
		},

		// Adds a leading zero if time value is less than 10
		leadingZero : function (time) {
			var timeString = time;

			if (time < 10 && time >= 0) {
				timeString = "0" + time.toString();
			}

			return timeString;
		},

		// Start the necessary timers/intervals
		startTicker : function () {
			this.vars.ticker = window.setInterval($.proxy(this.updateTicker, this), 1000);
			this.setTimeout(this.updateTicker, 10);
		},

		// Stop countdown timers/intervals
		stopTicker : function (event) {
			if (this.vars.ticker) {
				window.clearInterval(this.vars.ticker);
				delete this.vars.ticker;
			}
			
			this.trigger(event);
		}
	});
	
}.call(RED));
