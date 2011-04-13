// remap jQuery to $
(function($){})(this.jQuery);

/** 
 * paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 * // REQUIRES SYS.DEBUG
 * ex: log('test'); // same as console.log('test') but supresses error on browsers that do not have console enabled
 */
window.log = (function(){if(typeof(this.console) !== 'undefined' && this.console != null && (SYS && SYS.DEBUG) && this.console) console.log(arguments[0]); });

/** 
 * html5shiv MIT @rem remysharp.com/html5-enabling-script
 * iepp v1.6.2 MIT @jon_neal iecss.com/print-protector
 * The innerShiv method to dynamically add html5 elements to IE8- browsers
 */
window.innerShiv = (function() {
	var d, r;
	
	return function(h, u) {
		if (!d) {
			d = document.createElement('div');
			r = document.createDocumentFragment();
			/*@cc_on d.style.display = 'none';@*/
		}
		
		var e = d.cloneNode(true);
		/*@cc_on document.body.appendChild(e);@*/
		e.innerHTML = h.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		/*@cc_on document.body.removeChild(e);@*/
		
		if (u === false) return e.childNodes;
		
		var f = r.cloneNode(true), i = e.childNodes.length;
		while (i--) f.appendChild(e.firstChild);
		
		return f;
	}
}());

// catch all document.write() calls
(function(doc){
  var write = doc.write;
  doc.write = function(q){
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


/**
 * Objective: Promote a standard in JS OOP
 * based on ThinWire Ajax Framework (Bound Inheritance)
 * ex: Module = Class.extend({ ... function list..... }); // automatically calls Class.init();
 * @param init - func() - super class with  this.$.init
 * @param vars - obj{} - automatically extended for proper override
 * @param constants - obj{} - for string constants only
 * 
 */
var Class = (function(){
		
	// VARS
	this.vars = {}; 
	
	// SCOPE stub - this is here to remind you to set up your scope properly 
	this.scope = function($scope) {self=$scope||this;if(this.$.scope)this.$.scope(self);}
		
	// INIT function
	this.init=function(){};
	
	/////////////////////////////////
	// ENCAP
	// encapsulate a function so it maintains reference to THIS and can be referenced globally 
	// another way of saying:   self.vars.stub[funcName] = function() { self[funcName](); }
	// used for binding events that need to be unbound later
	// $(document).bind("resize",encap("onResize")) // will fire  self.onResize(e);  /// you can keep reference to "this/self" and can unbind it later)
	this.encap=function(funcName) {
		var self=this;
		if(!self[funcName] || (typeof(self[funcName]) != 'function')) {
			log(self);
			throw ("[self." + funcName + "] does not exist.");
		}
		self.vars.stub = self.vars.stub || {};
		if(!self.vars.stub[funcName]) {
			this.vars.stub[funcName] = (function() {
				self[funcName].apply(self,arguments);
			});
		}
		return self.vars.stub[funcName];
	}
	
	////////////////////////////////
	// constructor
	//
	this.constructor=function(vars){ // deep copy the vars + call init()
		vars = $.extend({}, this.vars, vars);
		var cur = this;
		while(cur.$) {
			if(cur.$.vars) vars = $.extend({}, cur.$.vars, vars);
			cur = cur.$;
		}
		this.vars = vars;
		if(this.constants){ // constants(  Class.constants.MY_CONSTANT = 'SomeConstantString';// Access with Class.MY_CONSTANT
			for(var i in this.constants){
				if(typeof(this.constants[i])=='string')this.__defineGetter__(i,function(){return this.constants[i]});
			}
		}
				
		if(this.scope)this.scope(); // creates "self" reference
		this.init(); // inits the class
	}
});

Class.__asMethod__ = function(func, superClass) {    
	return function() {
		var currentSuperClass = this.$;
		this.$ = superClass;
		var ret = func.apply(this, arguments);        
		this.$ = currentSuperClass;
		return ret;
	};
};

Class.extend = function(def) {
	var classDef = function() {
		if (arguments[0] !== Class) this.constructor.apply(this, arguments);
	};
	
	var proto = new this(Class);
	var superClass = this.prototype;
	
	for (var n in def) {
		var item = def[n];                        
		if (item instanceof Function) item = Class.__asMethod__(item, superClass);
		proto[n] = item;
	}
	proto.$ = superClass;
	classDef.prototype = proto;
	classDef.extend = this.extend;
	return classDef;
};


/**
 * utility widgets
 */
(function() {
	/**
	 * isValidForm()
	 * @param config		- OBJECT { onError, onReset, validateAll, onCustomError, onSuccess }
	 * 			config.onError(field,form)			- function - called when field throws error - onError(field,form)
	 * 			config.onCustomError(field,form)	- function - called if regular validation passes - onCustomError(field,form)
	 * 			config.onSuccess(form)				- function - if validation succeeds, successfunction fires - onSuccess(form)
	 * 			config.onReset(form)				- function - called before isValidForm runs to reset UI
	 * 			config.validateAll 					- bool - True : validate all fields regardless of error, False : break validation at first error 
	 * 			config.onServerError				- function - called if server returns andything other than 200
	 */
	$.fn.isValidForm = (function(config){
		if($(this).hasClass("submitting") || $(this).hasClass("disabled")) {
			return false;
		}
		
		if(config.onReset && typeof(config.onReset)=='function') config.onReset($(this));
		var isValid = true;
		
		var fields = $(this).find("input[required=true],select[required=true],textarea[required=true]");
		
		
		for(var i = 0; i < fields.length; i++) {
			if(fields[i].value) fields[i].value=fields[i].value.sanitize();
			
			if(!(fields[i].value) || (fields[i].type=="checkbox" && !fields[i].checked)) {
				if(config.onError && typeof(config.onError)=='function') config.onError(fields[i],$(this));
				if(!config.validateAll) return false;
				isValid = false;
			}
		}

		if(config.onCustomError && typeof(config.onCustomError)=='function') {  // CUSTOM ERROR CHECKING
			fields = $(this).find("input,select,textarea");
			for(var i = 0; i < fields.length; i++) {
				var isCustomValidated = config.onCustomError(fields[i],$(this)); // 
				if(isCustomValidated!==true) {
					if(config.onError && typeof(config.onError)=='function') config.onError(fields[i],$(this),isCustomValidated); // UI handling
					if(!config.validateAll) return false;
					isValid = false;
				}
			}
		}
		
		fields = null;
		
		if(config.onServerError && typeof(config.onServerError)=='function') {
			$(this).removeClass("submitting");
			$(this).unbind('ajaxError'); // unattach listener	
			$(this).ajaxError(config.onServerError); // attach lsitener for server error
		}
		
		if(isValid && config.onSuccess && typeof(config.onSuccess)=='function') config.onSuccess($(this)); // CUSTOM onSuccessFunction
		return isValid;
	});
	
	
	$.fn.radioValue = (function() {
		for(var i = 0; i < $(this).length; i++) {
			if($(this)[i].checked) return $(this)[i].value
		}
		return null;
	});
	
	/**
	 * adds "nth-child1, nth-child2...." to target
	 */ 
	$.fn.nthChild = (function() {
		if($.browser.msie && $.browser.version < 9) {
			return this.each(function(){
				$(this).addClass("nth-child"+($(this).index()+1));
			});
		}
		return this;
	});
	
	/**
	 * convert an element to a string, escpecially handy when pulling <embed>s off the DOM that you want to keep reference to them and not have them leaking in IE
	 * example: $('embed').elementToString(); // returns ['<embed src="test.swf"..../>']
	 */
	$.fn.elementToString = (function(asString) {
		var ar = [];
		var elToString = function(element) {
			var div = $(element).clone().wrap("<div/>").parent();
			var str = div.html();
			
			div.remove();
			delete div;
			return str;
		}
		for(var i=0; i < this.length; i++) {
			ar.push(elToString(this.get(i)));
		}
		
		delete elToString;
		
		if(asString) { return ar[0]; }
		
		return ar;
	});
	
})();

/**
 * Prototype the String class for common form validation
 * TODO consider case that [field] is not a required field when validating don't require non-null
 * @usage myemail.isEmail() / myPhone.isPhone();
 */
(function() {	
	String.prototype = $.extend(String.prototype, {
		
		sanitize : function() {
			var s = this;
			s = s.replace(/[\u2018|\u2019|\u201A]/g, "\'"); // smart single quotes and apostrophe
			s = s.replace(/[\u201C|\u201D|\u201E]/g, "\""); // smart double quotes
			s = s.replace(/\u2026/g, "...");// ellipsis
			s = s.replace(/[\u2013|\u2014]/g, "-");// dashes
			s = s.replace(/\u02C6/g, "^");// circumflex
			s = s.replace(/\u2039/g, "<"); // open angle bracket
			s = s.replace(/\u203A/g, ">"); // close angle bracket
			s = s.replace(/[\u02DC|\u00A0]/g, " ");// spaces
			return s;
		},
		

		/**
		 * isEmail
		 * @param xxx@xxx.xxx | xxx.xxx@xxx.xxx.xxx
		 */
		isEmail : function() {
			var pattern =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if(!this || !pattern.test(this)) return false; // invalid email
			return true;
		},
		
		/**
		 * isPhone
		 * @param xxx-xxx-xxxxx
		 */
		isPhone : function(isRequired) {
			if(!isRequired && !this.length) return true; // return true if not required and no phone number entered
			var pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;  
			if(!pattern.test(this)) return false; // invalid
			return true;
		},
			
		/**
		 * isDateOfBirth
		 * @param dob - mm/dd/yyyy
		 */
		isDateOfBirth : function() {
			var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;  // regular expression to match required date format 
			if(!this || !this.match(pattern)) return false; // invalid date
			return true;
		},
		
		/**
		 *
		 */
		isZipcode : function() {
			var pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
			if(!this || !pattern.test(this)) return false; // invalid zip
			return true;
		},
		
		/**
		 * check to see if a string when eval'd is an available function (ex:  "Module.Video".isFunction() returns true or false);
		 *  @param this	- string that contains valid JS function name ("console","console.log") 
		 *	@return false if not a function
		 */
		isFunction : function() {
			// this doesnt work as expected...
			var pattern = /^[a-zA-Z_\$][a-zA-Z0-9_\$\.]*$/i; // should return false if you're passing a string that can't possibly be a function (contains illegal characters...)
			if(!this || !pattern.test(this))  return false;
			
			var ar = this.split("."); // test each "." as an object
			for(var i=0; i < ar.length; i++) {
				eval("var type = typeof(" + ar.slice(0,i+1).join(".") + ");"); // as long as the type is defined, we're in business
				if(type=="undefined" || type=="string" || type=="number") return false;
			}
			var isFunc = eval("typeof "+this+"=='function'"); 	// finally, if the string is a function...
			if(isFunc) return true; 							//...return true
			return false;
		},
		
		isURL : function() {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(this);
		},
		
		isYouTubeURL: function() {
			var regexp = /https?:\/\/(?:[a-zA_Z]{2,3}.)?(?:youtube\.com\/watch\?)((?:[\w\d\-\_\=]+&amp;(?:amp;)?)*v(?:&lt;[A-Z]+&gt;)?=([0-9a-zA-Z\-\_]+))/i;
			return regexp.test(this);
		},
		
		// querystring value
		qs : function() {
			var str = this.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\?&]"+str+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( window.location.href );
			if( results == null ) return "";
			else return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	});
})();