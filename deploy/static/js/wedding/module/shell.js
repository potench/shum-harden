// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* shell.js */

// ## The red Namespace
var red = red || {};

// ## Local Namespace
// You should replace the namespace "wedding" with your own Site namespace, this is only an wedding.
var wedding = wedding || {};
wedding.module = wedding.module || {};

// Site shell object
wedding.module.Shell = (function () {
	
	var $nav = $("header nav"),
		$links = $nav.find("a"),
		$html = $("html"),
		$body = $("body"),
		sectionRects;

	return wedding.Module.extend({
		
		init : function () {
			$body.on("click", "a[data-section]", $.proxy(this.onClickNav, this));
			$(window).bind("scroll", $.proxy(this.onScroll, this));

			this.updateNavSelection(true);
		},


		getScrollPos : function () {
			return $("html").scrollTop() || $("body").scrollTop();
		},

		onScroll : function (e) {
			// at rest update the top nav
			if (this.vars.timeout) {
				window.clearTimeout(this.vars.timeout);
			}

			this.vars.timeout = this.setTimeout(this.updateNavSelection, 200);
		},

		updateNavSelection : function (snapTo, sectionId) {
			var y = this.getScrollPos();


			
			if (!sectionRects) {
				sectionRects = [];

				$("section.page").each(function () {
					var top = $(this).offset().top,
						bottom = $(this).height() + top - 191;

					sectionRects.push({
						top : top,
						bottom : bottom,
						id : $(this).attr("id")
					});
				})
			}

			// get sectionId by scroll Position
			if (!sectionId) {
				for (i = sectionRects.length - 1; i >= 0; i--) {
					if(y <= sectionRects[i].bottom && y >= sectionRects[i].top) {
						sectionId = sectionRects[i].id;
						break;
					}
				}

				if (!sectionId) { // default to first
					sectionId = $("section.page").attr("id");
				}
			}
			
			$links.parent().removeClass("selected");
			$links.filter('[data-section="' + sectionId + '"]').parent().addClass("selected");

			if (snapTo) { // set to top of section
				this.scrollToSection(sectionId);
			}

			if (this.vars.sectionId !== sectionId) {
				$.publish("track", [{type: "page", url: sectionId }]);
			}

			this.vars.sectionId = sectionId;
		},

		scrollToSection : function (sectionId) {
			var $section = $("section#"+sectionId),
				top = $section.offset().top + 100;

				top = (sectionId === 'welcome') ? 0 : top;

			$html.add($body).animate({
				"scrollTop": top
			}, 540, "easeInOutExpo");

		},

		onClickNav : function (e) {

			var targ = $(e.currentTarget),
				id = targ.data("section"),
				section = (id) ? $("section#"+id) : null,
				top;

			if (id && section) {
				
				e.preventDefault();

				this.updateNavSelection(false, id);
				this.scrollToSection(id);

			} else {
				throw "That section does not exist";
			}

			return false;
		}

	});
	
}.call(wedding));
