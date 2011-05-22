/*
File: class.js

About: Version
	1.0

Description:
	Simple JavaScript Inheritance
	By John Resig http://ejohn.org/
	MIT Licensed.
	
	Inspired by base2 and Prototype

*/

/*global $: true, console: true, Class: true */
/*jslint browser: true, onevar: true */

(function () {
	var initializing = false,
		fnTest = (/xyz/).test(function () {
			var xyz;
		}) ? (/\bsup\b/) : (/.*/);

	// The base Class implementation (does nothing)
	this.Class = function () {};

	// Create a new Class that inherits from this class
	Class.extend = function extend (prop) {
		var sup = this.prototype,
		    prototype, name, tmp, ret, func;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (name in prop) {			
			if (prop.hasOwnProperty(name)) {
				func = prop[name];

				// Check if we're overwriting an existing function
				prototype[name] = (typeof func === "function") && (typeof sup[name] === "function") && fnTest.test(func) ? (function (name, fn) {
					return function () {
						tmp = this.sup;

						// Add a new .sup() method that is the same method
						// but on the super-class
						this.sup = sup[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						ret = fn.apply(this, arguments);
						this.sup = tmp;

						return ret;
					};
				}(name, func)) : func;
			}
		}

		prototype.vars = $.extend(true, {}, this.prototype.vars, prototype.vars); // inherit vars

		// The dummy class constructor
		function Class (vars) {

			if (vars) {
				$.extend(true, this.vars, vars); // override this.vars object with passed argument
			}
			
			// All construction is actually done in the init method
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = extend;

		return Class;
	};
}());