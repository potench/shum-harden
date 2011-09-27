// ### Part of the [Rosy Framework](http://github.com/ff0000/rosy)
/* custom-form-field.js */

// ## Local Namespace

// Home Page class

// Site-specifc namespace
var RED = RED || {};

// Page namespace
RED.Module = RED.Module || {};
	
// Home specific instance
RED.Module.CustomFormField = (function () {
	
	// Extends RED.Page
	return RED.Module.extend({
		
		vars : {
			field : null
		},
		
		// Home  page level functionality
		init : function (vars) {
			this.setDOMReferences();
			this.setupCustomFormField();
		},

		setDOMReferences : function () {
			$.extend(this.vars, {
				type : this.setFieldType()
			});
		},

		setFieldType : function () {
			var field = this.vars.field,
				type = field.is("input") ? field.attr("type") : field[0].nodeName.toLowerCase();

			return type;
		},

		setupCustomFormField : function () {
			this.addCustomWrapper();
		},

		addCustomWrapper : function () {
			this.vars.wrap = $('<span></span>').addClass("customfield").addClass(this.vars.type);
			this.vars.wrap.insertAfter(this.vars.field);
			this.vars.field.appendTo(this.vars.wrap);

			if (this.vars.type) {
				this.setupSelect();
			}
		},

		setupSelect : function () {
			var select = this.vars.field,
				options = select.find("option"),
				index = select[0].selectedIndex,
				active = options.eq(index);
			
			this.vars.current = $('<span></span>').addClass("current");
			this.vars.current.appendTo(this.vars.wrap);

			this.setActiveOption(active);
			this.setupSelectEvents();
		},

		setActiveOption : function (option) {
			this.vars.current.text(option.text());
		},

		setupSelectEvents : function () {
			this.vars.field.bind("change", $.proxy(this.onSelectChange, this));
		},

		onSelectChange : function (e) {
			var select, option;

			select = e.currentTarget;
			option = $(select.options[select.selectedIndex]);

			this.setActiveOption(option);
		}
	});
}.call(RED));
