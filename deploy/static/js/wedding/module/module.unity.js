// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// You should replace the namespace "wedding" with your own Site namespace, this is only an wedding.
var wedding = wedding || {};
	wedding.module = wedding.module || {};

// Site shell object
wedding.module.Unity = (function () {
	
	var $player = $("#unity-player"),
		$template = $("#unity-embed-tmpl-1"),
		URL = "http://gnopgnop.com/";

	return wedding.module.Module.extend({

		vars : {
			movie : {
				"tabindex": "0",
				"backgroundcolor": "000f1b",
				"bordercolor": "000f1b",
				"textcolor": "FFFFFF",
				"logoimage": URL + "assets/img/gui_logo.png",
				"progressbarimage": URL + "assets/img/progressBar.png",
				"progressframeimage": URL + "assets/img/progressBarFrame.png",
				"backgroundcolor": "000f1b",
				"bordercolor": "000f1b",
				"textcolor": "FFFFFF",
				"src" : URL + "assets/unity/GnopGnop.unity3d?gnopygnopysecret=justletmeplaythisfucker"
			}
		},
		
		init : function () {
			this.sup.apply(this, arguments);

			this.load();
		},

		unload : function () {
			$player.html('')
	    		.css({visibility:"hidden", width:0, height:0})
		},

		load : function () {
			var $compiledHTML;

			// $player.html('<div class="missing"><a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!"><img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" /></a></div>');
		    
		    $compiledHTML = $(Mustache.to_html($template.html(), this.vars.movie));
			$compiledHTML.appendTo($player);

			/*if (typeof unityObject != "undefined") {
				var params = {
					backgroundcolor: "000f1b",
					bordercolor: "000f1b",
					textcolor: "FFFFFF",
					logoimage: "assets/img/gui_logo.png",
					progressbarimage: "assets/img/progressBar.png",
					progressframeimage: "assets/img/progressBarFrame.png"
				};
				unityObject.embedUnity("unityPlayer", "assets/unity/GnopGnop.unity3d?gnopygnopysecret=justletmeplaythisfucker", 960, 500, params);	
			}	 

			$("#unityContainer").css({visibility:"visible"});   	
			$("#unityPlayer").css({visibility:"visible", width:960, height:500}); */
		}

	});
	
}.call(wedding));


/*function unloadGame()
		    {
		    	$("#unityPlayer").html('');
		    	$("#unityPlayer").css({visibility:"hidden", width:0, height:0});
		    	$("#unityContainer").css({visibility:"hidden"});
		    }
		    
		    function loadGame()
		    {
		    	$("#unityPlayer").html('<div class="missing"><a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!"><img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" /></a></div>');
		    	
		    	if (typeof unityObject != "undefined") {
		    		var params = {
		    			backgroundcolor: "000f1b",
		    			bordercolor: "000f1b",
		    			textcolor: "FFFFFF",
		    			logoimage: "assets/img/gui_logo.png",
		    			progressbarimage: "assets/img/progressBar.png",
		    			progressframeimage: "assets/img/progressBarFrame.png"
		    		};
		    		unityObject.embedUnity("unityPlayer", "assets/unity/GnopGnop.unity3d?gnopygnopysecret=justletmeplaythisfucker", 960, 500, params);	
		    	}	 
		    	
		    	$("#unityContainer").css({visibility:"visible"});   	
		    	$("#unityPlayer").css({visibility:"visible", width:960, height:500}); 
		    }
		    function GetUnity() {
		    	if (typeof unityObject != "undefined") {
		    		return unityObject.getObjectById("unityPlayer");
		    	}
		    	return null;
		    }	*/