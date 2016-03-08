function validateText(text) {
	var pattern = /^[a-zA-Z ]*$/;
	return pattern.test(text);
}

function validateNoHTML(text) {
	var pattern = /^(?!.*<[^>]+>).*/;
	return pattern.test(text);
}

function validateNumber(text) {
	var pattern = /^[0-9]*$/;
	return pattern.test(text);
}

function validateEmail(email) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(email);
}

function validatePhone(phone) {
	var pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	return pattern.test(phone);
}

function valid(input) {
	input.removeClass("form-control-danger form-control-warning");
	input.addClass("form-control-success");
	input.parent().removeClass("has-danger has-warning");
	input.parent().addClass("has-success");
}

function invalid(input) {
	input.removeClass("form-control-danger form-control-success");
	input.addClass("form-control-warning");
	input.parent().removeClass("has-danger has-success");
	input.parent().addClass("has-warning");
}

function empty(input) {
	input.removeClass("form-control-warning form-control-success");
	input.addClass("form-control-danger");
	input.parent().removeClass("has-warning has-success");
	input.parent().addClass("has-danger");
}

(function($) {
	
	$.fn.prettyValidate = function(options) {
	
		// Plugin Defaults
		options = $.extend({
			reset: true, // reset form on success
			shake: true, // shake the fields when error
			beforeSend: null, // fire before validation
			success: null, // success callback
			error: null // error callback
		}, options);
		
		// Run Plugin
		return this.each(function() {
			
			// Add Styling
			$(this).addClass("prettyValidate");
			
			// Load Color Field
			$('.form-control[type="color"]', this).each(function() {
				var label = $(this).attr("placeholder");
				$('<label for="color"><i class="fa fa-paint-brush"></i> '+ label +'</label>').insertAfter(this);
				$(this).colourBrightness();
			});
			
			// onChange Color Field
			$('.form-control[type="color"]', this).on('input', function() {
				var color = $(this).val();
				var icon = '<i class="fa fa-paint-brush"></i>';
				var contents = icon +" "+ color;
				$(this).css('background-color', color).next().html(contents).find("i").css('color', color);
				$(this).colourBrightness();
			});
			
			// Load Range Field
			$('.form-control[type="range"]', this).each(function() {
				var val = $(this).val();
				var min = ($(this).attr('min')) ? $(this).attr('min') : 0;
				var max = ($(this).attr('max')) ? $(this).attr('max') : 100;
				if ($(this).attr("placeholder")) {
					$('<label for="'+ $(this).attr('name') +'">'+ $(this).attr("placeholder") +':</label>').insertBefore(this);
					$('<label class="value">'+ val +'</label>').insertBefore(this);
				}
				$('<label class="min">'+ min +'</label>').insertAfter(this);
				$('<label class="max">'+ max +'</label>').insertAfter(this);
				var minWidth = $(this).parent().find("label.min").outerWidth();
				var maxWidth = $(this).parent().find("label.max").outerWidth();
				var width = minWidth + maxWidth + 20;
				$(this).css({width: "calc(100% - "+ width +"px)", marginLeft: minWidth + 10});
			});
			
			// onChange Range Field
			$('.form-control[type="range"]', this).on('input', function() {
				var val = $(this).val();
				if ($(this).attr("placeholder")) {
					$(this).parent().find("label.value").html(val);
				}
			});
			
			// Submit Form
			$(this).on('submit', function() {
				event.preventDefault();
				$.isFunction(options.beforeSend) && options.beforeSend.call(this);
				var error = 0;
				var form  = $(this);
				var input = $('fieldset input, fieldset textarea', form);
				input.each(function() {
					if ($(this).hasClass('required') || this.value) {
						if (!this.value) { empty($(this)); error++; }
						else if ($(this).attr("type") == "text" && !validateText($(this).val())) { invalid($(this)); error++; }
						else if ($(this).attr("type") == "number" && !validateNumber($(this).val())) { invalid($(this)); error++; }
						else if ($(this).attr("type") == "email" && !validateEmail($(this).val())) { invalid($(this)); error++; }
						else if ($(this).attr("type") == "phone" && !validatePhone($(this).val())) { invalid($(this)); error++; }
						else if ($(this).attr("type") == "range") {}
						else if ($(this).is("textarea") && !validateNoHTML($(this).val())) { invalid($(this)); error++; }
						else { valid($(this)); }
					}
				});
				if (error == 0) {
					$.isFunction(options.success) && options.success.call(this);
					if (options.reset) form[0].reset();
				} else {
					$.isFunction(options.error) && options.error.call(this);
					if (options.shake) {
						$(".has-danger, .has-warning", form).addClass("shake");
						setTimeout(function() {
							$(".has-danger, .has-warning", form).removeClass("shake");
						}, 500);
					}
				}
			});
			
			// Reset Form
			$(this).on('reset', function() {
				$("input, textarea", this).each(function() {
					$(this).removeClass("form-control-danger form-control-warning form-control-success");
					if($(this).attr("type") == "color") {
						var label = $(this).attr("placeholder");
						$(this).removeClass("dark light").next().html('<i class="fa fa-paint-brush"></i> '+ label);
					}
				});
				$(this).find("fieldset").removeClass("has-danger has-warning has-success shake");
			});
			
			// On Input Change
			$("input, textarea", this).on('change keyup blur input', function() {
				if ($(this).hasClass('required') || this.value) {
					if (!this.value) { empty($(this)); }
					else if ($(this).attr("type") == "text" && !validateText($(this).val())) { invalid($(this)); }
					else if ($(this).attr("type") == "number" && !validateNumber($(this).val())) { invalid($(this)); }
					else if ($(this).attr("type") == "email" && !validateEmail($(this).val())) { invalid($(this)); }
					else if ($(this).attr("type") == "phone" && !validatePhone($(this).val())) { invalid($(this)); }
					else if ($(this).attr("type") == "range") {}
					else if ($(this).is("textarea") && !validateNoHTML($(this).val())) { invalid($(this)); }
					else { valid($(this)); }
				} else {
					$(this).removeClass("form-control-danger form-control-warning form-control-success");
					$(this).parent().removeClass("has-danger has-warning has-success");
				}
			});
			
		});
		
	}
	
}(jQuery));