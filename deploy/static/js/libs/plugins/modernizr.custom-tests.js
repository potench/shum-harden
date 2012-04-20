

(function () {

	if(Modernizr) {

		Modernizr.transitionEnd = (function() {
			
			if(Modernizr.csstransitions) {
				var transEndEventNames = {
					'WebkitTransition'	: 'webkitTransitionEnd',
					'MozTransition'		: 'transitionend',
					'OTransition'		: 'oTransitionEnd',
					'msTransition'		: 'msTransitionEnd', // maybe?
					'transition'		: 'transitionEnd'
				};
				return transEndEventNames[ Modernizr.prefixed('transition') ];
			}
			
			return;

		})();

		Modernizr.addTest('grayscale', function() {
			if ((typeof document.body.style.filter === "undefined") && (typeof document.body.style.webkitFilter === "undefined")) {
				return false;
			}
			return true;
		});

		Modernizr.addTest('h264', function(){
			if(!!document.createElement('video').canPlayType){	
				var v = document.createElement("video");
				return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
			}
			return false;
		});


		// selectorSupported lovingly lifted from the mad italian genius, diego perini
		// http://javascript.nwbox.com/CSSSupport/
		function selectorSupported(selector){
		  
		  var support, link, sheet, doc = document,
		      root = doc.documentElement,
		      head = root.getElementsByTagName('head')[0],

		      impl = doc.implementation || {
		              hasFeature: function() {
		                  return false;
		              }
		      },

		  link = doc.createElement("style");
		  link.type = 'text/css';

		  (head || root).insertBefore(link, (head || root).firstChild);

		  sheet = link.sheet || link.styleSheet;

		  if (!(sheet && selector)) return false;

		  support = impl.hasFeature('CSS2', '') ?
		  
		              function(selector) {
		                  try {
		                      sheet.insertRule(selector + '{ }', 0);
		                      sheet.deleteRule(sheet.cssRules.length - 1);
		                  } catch (e) {
		                      return false;
		                  }
		                  return true;
		                  
		              } : function(selector) {
		                
		                  sheet.cssText = selector + ' { }';
		                  return sheet.cssText.length !== 0 && !(/unknown/i).test(sheet.cssText) && sheet.cssText.indexOf(selector) === 0;
		              };
		   
		  return support(selector);

		};


		Modernizr.addTest('nthchild',function(){
		  return selectorSupported(':nth-child(1)');
		});

	}else {
		throw "Load custom Modernizr.js with 'prefixed' features in <head> of document."
	}
}());