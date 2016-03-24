/*!
 * prettyValidate v0.8.8-beta (http://lostlabs.github.com/prettyValidate/)
 * Copyright 2016 Lost Labs
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */


(function($) {
	
	function validate(input, type) {
		var pattern = {
				text: /^[a-zA-Z ]*$/,
				noHTML: /^(?!.*<[^>]+>).*/,
				number: /^[0-9]*$/,
				email: /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i,
				phone: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
				hex: /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/,
				date: /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/
			},
			valid = function(input) { input.removeClass("form-control-danger form-control-warning").addClass("form-control-success").parent().removeClass("has-danger has-warning").addClass("has-success"); },
			invalid = function(input) { input.removeClass("form-control-danger form-control-success").addClass("form-control-warning").parent().removeClass("has-danger has-success").addClass("has-warning"); },
			empty = function(input) { input.removeClass("form-control-warning form-control-success").addClass("form-control-danger").parent().removeClass("has-warning has-success").addClass("has-danger"); },
			error = 0;
		$.each(pattern, function(i, p){
			if (i == type) {
				if (!input.val()) { empty(input); error++; }
				else if (!p.test(input.val())) { invalid(input); error++; }
				else { valid(input); }
			}
		}); if (error != 0) return true;
	}
	
	$.fn.prettyValidate = function(options) {
	
		// Plugin Defaults
		options = $.extend({
			ajax: false, // use Ajax to submit the form
			reset: true, // reset form on success
			shake: true, // shake the fields when error
			valid: null, // valid callback
			invalid: null, // invalid callback
			success: null, // form success callback
			error: null, // error callback
			complete: null, // once ajax is completed
			beforeSend: null // fired before proccessing
		}, options);
		
		// Run Plugin
		return this.each(function() {
			
			// Add Styling
			$(this).addClass("prettyValidate");
			
			// Load Color Field
			$('.form-control[type="color"]', this).each(function() {
				$('<label for="' + $(this).attr("name") + '"><i class="fa fa-paint-brush"></i></label>').insertAfter(this);
				$(this).addClass('color').attr('type','text').colourBrightness().colorpicker({
					align: 'left',
					container: $(this).parent(),
					format: 'hex'
				}).on('changeColor', function() {
					$(this).css('background-color', $(this).val());
					$(this).colourBrightness();
				});
			});
			
			// Load Range Field
			$('.form-control[type="range"]', this).each(function() {
				var val = $(this).val();
				var min = ($(this).attr('min')) ? $(this).attr('min') : 0;
				var max = ($(this).attr('max')) ? $(this).attr('max') : 100;
				if ($(this).attr("placeholder") && !$(this).prev('label').length) {
					$('<label for="'+ $(this).attr('name') +'">'+ $(this).attr("placeholder") +':</label>').insertBefore(this);
					$('<label class="value">'+ val +'</label>').insertBefore(this);
				}
				$('<label class="min">'+ min +'</label>').insertAfter(this);
				$('<label class="max">'+ max +'</label>').insertAfter(this);
				var minWidth = $(this).parent().find("label.min").outerWidth();
				var maxWidth = $(this).parent().find("label.max").outerWidth();
				var width = minWidth + maxWidth + 20;
				$(this).css({width: "calc(100% - "+ width +"px)", marginLeft: minWidth + 10}).on('input', function() {
					var val = $(this).val();
					if ($(this).attr("placeholder")) { $(this).parent().find("label.value").html(val); }
				});
			});
			
			// Load Date Field
			$('.form-control[type="date"]', this).each(function() {
				$('<label for="' + $(this).attr("name") + '"><i class="fa fa-calendar"></i></label>').insertAfter(this);
				$(this).addClass('date').attr('type', 'text').datepicker({
					autoclose: true,
					clearBtn: true,
					container: $(this).parent(),
					todayHighlight: true
				});
			});
			
			// Submit Form
			$(this).on('submit', function(event) {
				$.isFunction(options.beforeSend) && options.beforeSend.call(this);
				var error = 0;
				var form  = $(this);
				var input = $('fieldset input, fieldset textarea', form);
				input.each(function() {
					if ($(this).hasClass('required') || this.value) {
						if ($(this).attr("type") == "text" && !$(this).is(".date, .color") && validate($(this), 'text')) { error++; }
						if ($(this).attr("type") == "number" && validate($(this), 'number')) { error++; }
						if ($(this).attr("type") == "email" && validate($(this), 'email')) { error++; }
						if ($(this).attr("type") == "phone" && validate($(this), 'phone')) { error++; }
						if ($(this).attr("type") == "range") {}
						if ($(this).hasClass("color") && validate($(this), 'hex')) { error++; }
						if ($(this).hasClass("date") && validate($(this), 'date')) { error++; }
						if ($(this).is("textarea") && validate($(this), 'noHTML')) { error++; }
					}
				});
				if (error == 0) {
					$.isFunction(options.valid) && options.valid.call(this);
					if (options.ajax) {
						$.ajax({
							type: "POST",
							url: form.attr("action"),
							data: $(form).serialize(),
							success: function(data) {
								if (options.reset) $(form)[0].reset();
								if ($.isFunction(options.success)) { options.success.call(this); }
								else {
									var message = '<b>Thank you!</b> for submitting the form.';
									if (!$(".success", form).length) { $('<div class="success"></div>').appendTo(form).html(message); }
									else { $(".success", form).html(message); }
								}
							},
							error: function(xhr, status, errorThrown) {
								if ($.isFunction(options.error)) { options.error.call(this, errorThrown); }
								else {
									var message = '<b>' + status + ':</b> ' + errorThrown;
									if (!$(".error", form).length) { $('<div class="error"></div>').appendTo(form).html(message); }
									else { $(".error", form).html(message); }
								}
							},
							complete: function(data) { 
								$.isFunction(options.complete) && options.complete.call(this, data)
							}
						});
						return false;
					} else { return true; }
				} else {
					$.isFunction(options.invalid) && options.invalid.call(this);
					if (options.shake) {
						$(".has-danger, .has-warning", form).addClass("shake");
						setTimeout(function() { $(".has-danger, .has-warning", form).removeClass("shake"); }, 500);
					}
					return false;
				}
			});
			
			// Reset Form
			$(this).on('reset', function() {
				$('.form-control.date', this).each(function() { $(this).datepicker('clearDates'); });
				$('.form-control.color', this).each(function() { $(this).colorpicker('setValue', '#FFFFFF').val('').removeClass("dark light").removeAttr("style"); });
				$('.form-control[type="range"]', this).each(function() {
					var min = ($(this).attr('min')) ? $(this).attr('min') : 0;
					if ($(this).attr("placeholder")) { $(this).parent().find("label.value").html(min); }
				});
				$(this).find("fieldset").removeClass("has-danger has-warning has-success shake");
				$("input, textarea", this).each(function() { $(this).removeClass("form-control-danger form-control-warning form-control-success"); });
			});
			
			// Detect Input Changes
			$("input, textarea", this).on('change changeColor changeDate input keyup blur', function() {
				if ($(this).hasClass('required') || this.value) {
					if ($(this).attr("type") == "text" && !$(this).is(".date, .color")) { validate($(this), 'text'); }
					if ($(this).attr("type") == "number") { validate($(this), 'number'); }
					if ($(this).attr("type") == "email") { validate($(this), 'email'); }
					if ($(this).attr("type") == "phone") { validate($(this), 'phone'); }
					if ($(this).attr("type") == "range") {}
					if ($(this).hasClass("color")) { validate($(this), 'hex'); }
					if ($(this).hasClass("date")) { validate($(this), 'date'); }
					if ($(this).is("textarea")) { validate($(this), 'noHTML'); }
				} else {
					$(this).removeClass("form-control-danger form-control-warning form-control-success");
					$(this).parent().removeClass("has-danger has-warning has-success");
				}
			});
			
		});
		
	}
	
}(jQuery));