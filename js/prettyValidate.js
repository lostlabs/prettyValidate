/*!
 * prettyValidate v0.8.8-beta (http://lostlabs.github.com/prettyValidate/)
 * Copyright 2016 Lost Labs
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */


(function($) {
	
	// Check The Fields
	function check(input, type, action) {
		var pattern = {
				text: /^[a-zA-Z ]*$/,
				noHTML: /^(?!.*<[^>]+>).*/,
				number: /^[0-9]*$/,
				email: /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i,
				phone: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
				ext: /^([0-9]{1,5})$/,
				hex: /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/,
				date: /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/
			},
			valid = function(input) { if (action) input.removeClass("form-control-danger form-control-warning").addClass("form-control-success"); },
			invalid = function(input) { if (action) input.removeClass("form-control-danger form-control-success").addClass("form-control-warning"); },
			empty = function(input) { if (action) input.removeClass("form-control-warning form-control-success").addClass("form-control-danger"); },
			error = 0;
		$.each(pattern, function(i, p){
			if (i == type) {
				if (!input.val()) { empty(input); error++; }
				else if (!p.test(input.val())) { invalid(input); error++; }
				else { valid(input); }
			}
		});
		if (error != 0) return false;
		else return true;
	}
	
	// Validate Fields
	function validate(item) {
		var error = 0;
		if (item.hasClass('required') || item.val()) {
			if (item.attr("type") == "text" && !item.is(".date, .color, .ext") && !check(item, 'text', true)) { error++; }
			else if (item.attr("type") == "number" && !check(item, 'number', true)) { error++; }
			else if (item.attr("type") == "email" && !check(item, 'email', true)) { error++; }
			else if (item.attr("type") == "phone" && !check(item, 'phone', true)) { error++; }
			else if (item.attr("type") == "range" && !check(item, 'number')) { error++; }
			else if (item.hasClass("color") && !check(item, 'hex', true)) { error++; }
			else if (item.hasClass("date") && !check(item, 'date', true)) { error++; }
			else if (item.hasClass("ext") && !check(item, 'ext', true)) { error++; }
			else if (item.is("textarea") && !check(item, 'noHTML', true)) { error++; }
		} else { item.removeClass("form-control-danger form-control-warning form-control-success"); }
		if (error != 0) return false;
		else return true;
	}
	
	$.fn.prettyValidate = function(options) {
	
		// Plugin Defaults
		options = $.extend({
			ajax: false, // use Ajax to submit the form
			url: false, // URL for Ajax request
			redirect: false, // redirect to success page
			reset: true, // reset form on success
			shake: true, // shake the fields when error
			valid: null, // valid callback
			invalid: null, // invalid callback
			success: null, // form success callback
			error: null, // error callback
			complete: null, // once overlay fades out
			beforeSend: null, // fired before proccessing
			debug: false // sends messages to console
		}, options);
		
		// Run Plugin
		return this.each(function() {
			
			// Announce Items
			var form  = $(this);
			var field = $("fieldset", form);
			var input = $('input, textarea', field);
			
			// Add Styling
			form.addClass("prettyValidate");
			
			// Add Classes for Feedback
			field.addClass("has-danger has-warning has-success");
			
			// Load Phone Field
			$('.form-control[type="phone"][data-ext]', form).each(function() {
				if (!$(this).parent().find('.ext').length){
					$(this).parent().addClass("input-group");
					$('<input type="text" class="form-control ext" name="ext" placeholder="Ext">').insertAfter(this);
				}
			});
			
			// Load Color Field
			$('.form-control[type="color"]', form).each(function() {
				$('<label for="' + $(this).attr("name") + '"><i class="fa fa-paint-brush"></i></label>').insertAfter(this);
				$(this).addClass('color').attr('type','text').colourBrightness().colorpicker({
					align: 'left',
					container: $(this).parent(),
					format: 'hex'
				}).on('create.colorpicker changeColor.colorpicker', function(event) {
					if (event == 'create') { var color = ($(this).val() && check($(this), 'hex')) ? $(this).val() : '#FFFFFF'; }
					else { var color = (check($(this), 'hex')) ? event.color.toHex() : '#FFFFFF'; }
					$(this).css('background-color', color);
					$(this).colourBrightness();
				});
			});
			
			// Load Range Field
			$('.form-control[type="range"]', form).each(function() {
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
			$('.form-control[type="date"]', form).each(function() {
				$('<label for="' + $(this).attr("name") + '"><i class="fa fa-calendar"></i></label>').insertAfter(this);
				$(this).addClass('date').attr('type', 'text').datepicker({
					autoclose: true,
					clearBtn: true,
					container: $(this).parent(),
					format: 'mm/dd/yyyy',
					todayHighlight: true
				});
			});		
			
			// Submit Form
			form.on('submit', function(event) { var error = 0;
				$.isFunction(options.beforeSend) && options.beforeSend.call(this);
				input.each(function(){ if (!validate($(this), event)) { error++; } });
				if (error == 0) {
					$.isFunction(options.valid) && options.valid.call(this, event);
					if (options.ajax) {
						var setURL = (form.attr("action")) ? form.attr("action") : '',
						   formURL = (options.url) ? options.url : setURL,
						  formData = form.serialize();
						$('input, button, textarea', form).blur();
						$('.error, .success', form).remove();
						if (!$('.prettyLoading', form).length) {
							$('<div class="prettyLoading"></div>').appendTo(form).hide().fadeIn('500');
						} else { $('.prettyLoading', form).fadeIn('500'); }
						setTimeout(function(){
							$.ajax({
								type: "POST",
								url: formURL,
								data: formData,
								success: function(data) {
									$.isFunction(options.success) && options.success.call(this, data);
									if (options.redirect) { window.location.href = options.redirect; }
									else {
										var name = ' ',
											full = $('input[name="name"]', form).val(),
											first = $('input[name="firstname"]', form).val(),
											last = $('input[name="lastname"]', form).val();
										if (full) { name += full + ','; }
										else if (first && last) { name += first + ' ' + last + ','; }
										else { var name = ''; }
										var message = '<strong>Thanks' + name + '</strong> for submitting the demo form.';
										$('<div class="success alert alert-success"></div>').appendTo(form).html(message).hide().fadeIn('500');
										setTimeout(function() {
											if (options.reset) { $(form)[0].reset(); }
											$.isFunction(options.complete) && options.complete.call(this, data);
											$('.prettyLoading, .success', form).fadeOut(function(){ $(this).remove(); });
										}, 1500);
									}
								},
								error: function(xhr, status, error) {
									if ($.isFunction(options.error)) { options.error.call(this, errorThrown); }
									else {
										var message = '<strong>' + status + ':</strong> ' + error;
										$('<div class="error alert alert-danger"></div>').appendTo(form).html(message).hide().fadeIn('500');
										setTimeout(function() {
											$('.prettyLoading, .error', form).fadeOut(function(){ $(this).remove(); });
										}, 1500);
									}
								}
							});
						}, 500);
						return false;
					} else { return true; }
				} else {
					$.isFunction(options.invalid) && options.invalid.call(this);
					if (options.shake) {
						$(".form-control-danger, .form-control-warning", form).parent().addClass("shake");
						setTimeout(function() { $(".form-control-danger, .form-control-warning", form).parent().removeClass("shake"); }, 500);
					}
					return false;
				}
			});
			
			// Reset Form
			form.on('reset', function() {
				$('.form-control.date', form).each(function() { $(this).datepicker('setDate', this.defaultValue); });
				$('.form-control.color', form).each(function() {
					var color = ($(this).val()) ? this.defaultValue : '#FFFFFF';
					$(this).css('background-color', color).colourBrightness();
				});
				$('.form-control[type="range"]', form).each(function() { $(this).parent().find("label.value").html(this.defaultValue); });
				$('input, textarea', field).each(function() { $(this).removeClass("form-control-danger form-control-warning form-control-success"); });
			});
			
			// Detect Input Changes
			$('input, textarea', field).on('change changeColor changeDate input keyup blur', function(event) { validate($(this), event); });
			
		});
		
	}
	
}(jQuery));