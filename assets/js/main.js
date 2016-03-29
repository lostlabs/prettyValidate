// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for prettyValidates's docs (http://lostlabs.github.com/prettyValidate/)
 * Copyright 2016 Lost Labs
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */

!function ($) {
	
	function em(input) {
		var emSize = parseFloat($('body').css('font-size'));
		return (emSize * input);
	}

	function resize() {
		$('.row.full-height').each(function (){
			if ($(window).width() > em(34)) {
				$('.row.full-height').css({height: $(window).height() - $('#nav').outerHeight()});
				$('.center-vertical').each(function() {
					var section = $(this).closest('section'),
						position = section.height() - $(this).outerHeight();
					$(this).css({position: 'absolute', top: position / 2});
					section.find('.prev').each(function() {
						var pagenav = (position - ($(this).outerHeight() / 4)) / 4;
						if (pagenav < 40) { $(this).css({top: pagenav}); }
						else { $(this).removeAttr('style'); }
					});
					section.find('.next').each(function() {
						var pagenav = (position - ($(this).outerHeight() / 4)) / 4;
						if (pagenav < 40) { $(this).css({bottom: pagenav}); }
						else { $(this).removeAttr('style'); }
					});
				});
			} else {
				$('.row.full-height').removeAttr('style');
				$('.center-vertical').removeAttr('style');
				$('.row#top > .ad').removeAttr('style');
				$('.row#top > div[class*="col-"]').removeAttr('style');
				$('.row#contact > #googlemaps').removeAttr('style');
			}
		});
		$('.highlight pre code').each(function() {
			if ($(this).get(0).scrollWidth > $(this).innerWidth()) { $(this).parent().addClass('rightfade'); }
			else { $(this).parent().removeClass('rightfade'); }
		});
		
	}
	
	function parallax() {
		var scrollTop = $(window).scrollTop(),
			scrollBot = $(window).scrollTop() + $(window).outerHeight();
		$('.row#top').each(function() {
			if (scrollTop <= $(this).outerHeight() + $(this).position().top) {
				$('div[class*="col-"]', this).css({transform: 'translate3d(0, ' + (scrollTop * 0.3).toFixed(0) + 'px, 0)'});
			}
		});
		$('.row#demo').each(function() {
			if (scrollBot >= $(this).position().top && scrollTop <= $(this).position().top + $(this).outerHeight()) {
				var position = scrollBot - $(this).position().top - $(this).outerHeight();
				$('.mountains > .mountain_layer_0', this).css({transform: 'translateY(' + position * 0.55 + 'px)'});
				$('.mountains > .mountain_layer_1', this).css({transform: 'translateY(' + position * 0.5 + 'px)'});
				$('.mountains > .mountain_layer_2', this).css({transform: 'translateY(' + position * 0.4 + 'px)'});
				$('.mountains > .mountain_layer_3', this).css({transform: 'translateY(' + position * 0.3 + 'px)'});
				$('.mountains > .mountain_layer_4', this).css({transform: 'translateY(' + position * 0.2 + 'px)'});
				$('.mountains > .mountain_layer_5', this).css({transform: 'translateY(' + position * 0.1 + 'px)'});
			}
		});
		$('.row#contact').each(function() {
			if (scrollBot >= $(this).position().top) {
				var position = scrollTop - $(this).position().top + $('#nav').outerHeight();
				$('#googlemaps', this).css({'transform': 'translate3d(0, ' + position * 0.4 + 'px, 0)'});
				$('.clouds > .cloud_layer_0', this).css({'transform': 'translateY(' + position * 0.2 + 'px)'});
				$('.clouds > .cloud_layer_1', this).css({'transform': 'translateY(' + position * 0.3 + 'px)'});
				$('.clouds > .cloud_layer_2', this).css({'transform': 'translateY(' + position * 0.25 + 'px)'});
				$('.clouds > .cloud_layer_3', this).css({'transform': 'translateY(' + position * 0.25 + 'px)'});
			}
		});
	}
	
	function navColor() {
		var scroll = $(window).scrollTop(), nav = $('#nav').outerHeight() + 1,
			tPos = $('.row#top').position().top, tHeight = $('.row#top').outerHeight(),
			dPos = $('.row#demo').position().top, dHeight = $('.row#demo').outerHeight(),
			cPos = $('.row#contact').position().top, cHeight = $('.row#contact').outerHeight(),
			top = scroll <= tHeight - 1,
			demo = scroll >= dPos - nav && scroll <= dPos + dHeight - nav,
			contact = scroll >= cPos && scroll <= cPos + cHeight - nav;
		if (top || demo || contact) {
			$('#nav').removeClass('bg-primary');
			if (scroll >= dPos - nav && scroll <= dPos) { $('#nav').addClass('bg-demo'); }
			else { $('#nav').removeClass('bg-demo'); }
		} else {
			$('#nav').addClass('bg-primary').removeClass('bg-demo');
		}
	}

	$(document).ready(function () {
		
		// BASIC FUNCTIONS
		
		$(window).on('resize load', function() {
			parallax(); resize();
		}).on('scroll load', function() {
			parallax(); navColor();
		});
		
		$('body').css('padding-top', $('#nav').outerHeight());
		
		$('[data-toggle="tooltip"]').tooltip();

		$('a[href*="#"]:not([href="#"]):not(.anchorjs-link)').click(function(event) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var dest   = $(this).attr('href');
				var target = $(this.hash);
				var scroll = $('body').scrollTop();
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					ga('send', 'event', {eventCategory: 'Navigation', eventAction: 'Click', eventLabel: dest});
					var offset = target.offset().top - $('#nav').outerHeight();
					$('html, body').stop().animate({
						scrollTop: offset
					}, 1000);
					event.preventDefault();
				}
			}
		});

		$('a[href="#"]').click(function(e) { e.preventDefault(); });
		
		
		// TOP SECTION SCRIPTS
		
		$('.validation').prettyValidate().on('keydown', false);
		
		
		// DEMO SECTION SCRIPTS
		
		$('.demo').prettyValidate({
			ajax: true,
			valid: function() { $('.row#demo .autofill').fadeOut('500'); },
			complete: function() { $('.row#demo .autofill').fadeIn('500'); }
		});
		
		var prevbutton = '<button type="button" class="popover-prev btn btn-secondary">Prev</button>',
			nextbutton = '<button type="button" class="popover-next btn btn-primary">Next</button>';
		
		function setHeight(eventShown) {
			$('#' + $(eventShown.target).attr('aria-describedby')).css({
				top: function(){ return '-' + $(this).find('.btn').outerHeight() / 2 + 'px'; }
			});
		}
		
		function wtName(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="name"]').popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Text Validation', content: 'Text inputs will only accept letters.<br>It will show an error if any numbers or symbols are found.'});
			if (wt == true) {
				$('.demo input[name="name"]').val('John Doe').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).attr('disabled', true);
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtEmail(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtEmail(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="email"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Email Validation', content: 'Accepts only properly formatted email addresses, ex: <a href="#">email@address.com</a>.'});
			if (wt == true) {
				$('.demo input[name="email"]').val('john@email.com').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtName(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtPhone(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtPhone(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="phone"]').popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Phone Number Validation', content: 'Accepts US formated phone numbers, ex: <code>5555555555</code>, <code>555-555-5555</code>, <code>555 555 5555</code>.'});
			if (wt == true) {
				$('.demo input[name="phone"]').val('555-555-5555').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtEmail(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').next('input').focus(); wtExt(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtExt(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="ext"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Phone Ext Validation', content: 'To add an Phone Extension field, simply add <code>data-ext="true"</code> to your phone field. Accepts up to any 5 numbers long.'});
			if (wt == true) {
				$('.demo input[name="ext"]').val('252').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtPhone(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtColor(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtColor(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="color"]').popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Bootstrap Colorpicker', content: 'prettyValidate uses <a href="http://mjolnic.com/bootstrap-colorpicker/" target="_blank">Bootstrap Colorpicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="http://github.com/mjolnic" target="_blank">Javier Aguilar</a>.'});
			if (wt == true) {
				$('.demo input[name="color"]').colorpicker('setValue', '#0275d8').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').colorpicker('setValue', '#FFFFFF').val('').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtExt(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtDate(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtDate(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="date"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Bootstrap Datepicker', content: 'prettyValidate uses <a href="http://bootstrap-datepicker.readthedocs.org/en/latest/" target="_blank">Bootstrap Datepicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="https://github.com/eternicode" target="_blank">Andrew Rowls</a>.'});
			if (wt == true) {
				$('.demo input[name="date"]').datepicker('setDate', new Date()).change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').datepicker('clearDates').datepicker('hide').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtColor(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').datepicker('hide').popover('hide').parent().next('fieldset').find('input').focus(); wtRange(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtRange(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="range"]').popover('dispose').popover({html: true, offset: '13 18', placement: 'left', trigger: trigger, title: 'A Pretty Range', content: 'The value can be displayed by adding the <code>placeholder=\"\"</code> attribute.'});
			if (wt == true) {
				$('.demo input[name="range"]').focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						step = setInterval(function() { var newVal = parseInt($(input).val()) + 1; if (newVal <= 50) { $(input).val(newVal).parent().find('label.value').html(newVal); } else { clearInterval(step); } }, 15);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('0').change().removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').find('label.value').html('0').parent().prev('fieldset').find('input').focus(); wtDate(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtTextArea(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtTextArea(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo textarea').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Textarea Validation', content: 'Accepts all charachters but will return an error if any <code>HTML</code> has been detected.'});
			if (wt == true) {
				$('.demo textarea').val('Some Text').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('').removeClass('form-control-danger form-control-warning form-control-success').popover('hide').parent().removeClass('shake').prev('fieldset').find('input').focus(); wtRange(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtInputValid(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtInputValid(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="name"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Valid Text', content: 'If the users input matches the specified validation, a check mark will appear next to the field.'});
			if (wt == true) {
				$('.demo input[name="name"]').focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().prev('fieldset').find('input').focus(); wtTextArea(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtInputWarning(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtInputWarning(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="email"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Invalid Text', content: 'If the inputted text doesn\'t match the validation, a warning symbol will be shown and if the field has the class <code>required</code>, the form won\'t submit.'});
			if (wt == true) {
				$('.demo input[name="email"]').val('john@#').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('john@email.com').change().popover('hide').parent().prev('fieldset').find('input').focus(); wtInputValid(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide').parent().next('fieldset').find('input').focus(); wtInputError(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtInputError(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo input[name="phone"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Missing Text', content: 'If the field is left empty, an alert symbol will be shown and the form will not submit either.'});
			if (wt == true) {
				$('.demo input[name="phone"]').val('').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').val('555-555-5555').change().popover('hide').parent().prev('fieldset').find('input').focus(); wtInputWarning(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide'); wtInvalidSubmit(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtInvalidSubmit(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo button[type="submit"]').popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Invalid Submission', content: 'If the user tries to submit the invalid form, the fields with errors will shake as a visual feedback. This can be disabled using <code>shake: false</code> in the options.'});
			if (wt == true) {
				$('.demo button[type="submit"]').focus().popover('show').on('shown.bs.popover', function(eventShown) {
					$('.demo').submit();
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$('.demo input[name="phone"]').focus();
						$(input).unbind('blur').popover('hide'); wtInputError(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$(input).unbind('blur').popover('hide'); wtResetForm(wt);
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtResetForm(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$('.demo button[type="reset"]').popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Reset The Form', content: 'No worries though, if a user wants to start over they can simply reset the form and it will set all of the fields back to default.'});
			if (wt == true) {
				$('.demo button[type="reset"]').focus().popover('show').on('shown.bs.popover', function(eventShown) {
					$('.demo')[0].reset();
					var input = $(this);
					$(input).on('blur', function() { $(this).focus(); });
					$(prevbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).on('click', function() {
						$('.demo input[name="name"]').val('John Doe').change();
						$('.demo input[name="email"]').val('john@#').change();
						$('.demo input[name="phone"]').val('').change();
						$('.demo input[name="ext"]').val('252').change();
						$('.demo input[name="color"]').colorpicker('setValue', '#0275d8').change();
						$('.demo input[name="date"]').datepicker('setDate', new Date()).change();
						$('.demo input[name="range"]').val('50').change().parent().find('label.value').html('50');
						$('.demo textarea').val('Some Text').change();
						$('.demo button[type="submit"]').focus();
						$(input).unbind('blur').popover('hide'); wtInvalidSubmit(wt);
					});
					$(nextbutton).appendTo('#' + $(eventShown.target).attr('aria-describedby')).html('Finish!').on('click', function() {
						$(input).unbind('blur');
						$('.demo button[type="reset"]').popover('dispose');
						$('.walkthrough-stop').click();
					}); setHeight(eventShown);
				});
			}
		}
		
		function wtReset() { wtName(); wtEmail(); wtPhone(); wtExt(); wtPhone(); wtColor(); wtDate(); wtRange(); wtTextArea();  }
		wtReset();
		
		$('.row#demo .walkthrough').click(function() {
			var form = $('.demo');
			$(form)[0].reset();
			if ($(this).hasClass('walkthrough-start')) {
				$(this).removeClass('walkthrough-start').addClass('walkthrough-stop').text('Stop Walkthrough');
				$(form).addClass('wt').on('keydown', false);
				wtName(true);
			} else {
				$(this).removeClass('walkthrough-stop').addClass('walkthrough-start').text('Start Walkthrough');
				$('button, input, textarea', form).popover('dispose').unbind('blur');
				$(form).removeClass('wt').unbind('keydown').prettyValidate({
					ajax: true,
					valid: function() { $('.row#demo .autofill').fadeOut('500'); },
					complete: function() { $('.row#demo .autofill').fadeIn('500'); }
				});
				wtReset();
			}
		});
		
		$('.autofill').click(function(){
			$('.demo input[name="name"]').val('John Doe').change();
			$('.demo input[name="email"]').val('john@email.com').change();
			$('.demo input[name="phone"]').val('555-555-5555').change();
			$('.demo input[name="color"]').val('#0275d8').change();
			$('.demo input[name="date"]').datepicker('setDate', new Date()).change();
			$('.demo input[name="range"]').val('50').change().parent().find('label.value').html('50');
			$('.demo textarea').val('Some Text').change();
		});
		
		// USAGE SECTION SCRIPTS
		
		anchors.add('#usage h1');
		anchors.add('#usage h4');
		
		hljs.configure({ tabReplace: '   ' });
		$('figure code').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		$('.highlight').each(function() {
			var btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard"><i class="fa fa-clipboard"></i></span></div>';
			$(this).prepend(btnHtml);
			$('.btn-clipboard').tooltip({placement: 'left'});
		});
		
		$('.highlight pre code').on('scroll', function() {
			var math = $(this).get(0).scrollWidth - $(this).scrollLeft() - 1;
			if (math <= $(this).innerWidth()) { $(this).parent().removeClass('rightfade'); }
			else { $(this).parent().addClass('rightfade'); }
		});

		var clipboard = new Clipboard('.btn-clipboard', {
			target: function (trigger) {
				return trigger.parentNode.nextElementSibling;
			}
		});

		clipboard.on('success', function(e) {
			$(e.trigger).attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
			e.clearSelection();
		});

		clipboard.on('error', function(e) {
			var fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'Press \u2318 to copy' : 'Press Ctrl-C to copy';
			$(e.trigger).attr('title', fallbackMsg).tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
		});
		
		$(".example").prettyValidate({ valid: function(event) { event.preventDefault(); } });
		
		
		// CONTACT SECTION SCRIPTS

		$('.contact').prettyValidate({ajax: true});

		function showGoogleMaps() {
			var styles = [
				{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]},
				{"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]},
				{"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]},
				{"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]},
				{"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]},
				{"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
				{"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]},
				{"featureType": "water", "elementType": "all", "stylers": [{"color": "#0275d8"}]}
			],
			styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"}),
			position = [40.0577919, -75.541693],
			latLng = new google.maps.LatLng(position[0], position[1]),
			mapOptions = {zoom: 14, center: latLng, streetViewControl: false, navigationControl: false, mapTypeControl: false, scaleControl: false, zoomControl: false, scrollwheel: false, draggable: false, mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'] }};

			map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
		}
		
		google.maps.event.addDomListener(window, 'load', showGoogleMaps);

	});
			   
}(jQuery);