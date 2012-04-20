var wedding = wedding || {};
wedding.page = wedding.page || {};
	

wedding.page.Page = (function () {
	
	return wedding.Class.extend({

		vars : {

		},
		
		init : function () {
			this.unity = new wedding.module.Unity();
		}
		
	});

}.call(wedding));
