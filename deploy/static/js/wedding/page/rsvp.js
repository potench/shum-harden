// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* home.js */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var wedding = wedding || {};

// Page namespace
wedding.page = wedding.page || {};

// Home specific instance
wedding.page.RSVP = (function () {

	var $welcome = $("#welcome"),

		$rsvp = $("#rsvp"),
		$form = $rsvp.find("form"),
		$span = $form.find(".radio"),
		$submit = $form.find("span.submit"),
		$inputs = $form.find('[name="code"], [name="name"], [name="message"]'),
		$radio = $form.find(':input[name="attending"]');


	// Extends wedding.Page
	return wedding.Page.extend({

		vars : {
			submitting : false
		},

		init : function () {
			
			$span.bind("click", $.proxy(this.radioToggle, this));

			$submit.bind("click", function() {
				$form.submit();
			});

			$form.bind("submit", $.proxy(this.onSubmit, this));

		},

		toggleSubmit : function (isOn) {

			if (!isOn) {
				$submit
					.text($submit.data("busy"))
					.addClass("busy")
					.attr("data-copy", $submit.data("busy"));
			} else {
				$submit
					.text($submit.data("ready"))
					.removeClass("busy")
					.attr("data-copy", $submit.data("ready"));
			}
		},


		onSubmit : function (e) {
			var submit = true,
				data = $form.serialize(),
				action = $form.attr("action");

			this.toggleSubmit(false);

			$.publish("track", [{type: "event", category: "rsvp", action: "submit", label:"attempt" }]);

			$form.find(".error").removeClass("show");

			if (this.vars.submitting) {
				submit = false;
			}

			$inputs.each(function () {
				if (!$(this).val()) {
					$(this).siblings(".error").addClass("show");
					submit = false;
				}
			});

			if (submit) {
				this.vars.xhr = $.ajax({
					url: action,
					type: "POST",
					data: data,
					dataType: "json",
					success: $.proxy(this.onSuccess, this),
					error : function (er) {
						$.publish("track", [{type: "event", category: "rsvp", action: "error", label:"xhr error: " + er }]);
					}
				});
			} else {
				this.toggleSubmit(true);
			}

			return false;
		},

		onSuccess : function (data) {
			var y = 0;
			this.toggleSubmit(true);

			switch (data.result) {
				case 1:
					// SUCCESS
					$.publish("track", [{type: "event", category: "rsvp", action: "success", label:data.result }]);
					alert("Thanks! We got your RSVP!");
					this.toggleSubmit(false);
					break;
				case -1:
					y = $inputs.filter('[name="code"]').siblings(".error")
						.addClass("show")
						.offset().top;

					$.publish("track", [{type: "event", category: "rsvp", action: "error", label:"code error" }]);
					break; 
				case -2:
					y = $form.find("li.submit .error")
						.addClass("show")
						offset().top;

					$.publish("track", [{type: "event", category: "rsvp", action: "error", label:"500 server error" }]);
					break;
				case -3: // too many attempts
					break;
				default:
					break;

			}

			if (y) {
				$('html,body').animate({scrollTop : y-100}, 400, 'easeInOutQuad');
			}
		},

		radioToggle : function (e) {
			var $el = $(e.currentTarget);
			$el.toggleClass("on");
			$span.not($el).toggleClass("on", !$el.hasClass("on"));

			$span.filter(".on").siblings("input").attr("checked", "checked");

		}

	});
}.call(wedding));
