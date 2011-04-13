var SiteName = SiteName || {}; // namespace for the entire site

(function($site) { // $site scope // outside of this function you would call "new SiteName.Page({});" or "new SiteName.Page.Page2({})"	
	
	/**
	 * Page
	 */
	(function() { // scope for Page
		var self; // top-level-this; // set by scope(); 
		
		$site.Page = Class.extend({
			// scope:function($scope){self=$scope||this;if(this.$.scope)this.$.scope(self);},
			
			vars : {
				x:1,
				y:2
			},
			
			init : function() {
				this.bar();
				this.func();
			},
			
			func : function() {
				log(1);
			},
			
			bar : function () {
				log(1.2);
			},
			
			delegate : function delegate( that, thatMethod ) {
				return function() {
					return thatMethod.call(that);
				};
			}
			
		});
	})();
	
	/**
	 * Page2
	 */
	(function() { // scope for Page2
		var self; // self=this on a class level (the top-level "this" of a class)
		
		$site.Page.Page2 = $site.Page.extend({
			vars : {
				x:4,
				y:5,
				z:6
			},
			
			// init : function() {				
			// 	// this.$.init(); // log(2);
			// 	// this.func(); // log(2);
			// },
			
			scope : function () {
				console.log("object");
				// this.$.constructor();
			},
			
			func : function() {
				log(2);
				
				$.each(this.delegate(this, function (i, item) {
					// this = $site.Page.Page2
					// item = current iterated item
				}));
			}
		});
	})();
})(SiteName);



