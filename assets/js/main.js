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
		var emSize = parseFloat($("body").css("font-size"));
		return (emSize * input);
	}

	function resize() {
		$('.row.full-height').each(function (){
			if ($(window).width() > em(34)) {
				$('.row.full-height').css({height: $(window).height() - $("#nav").outerHeight()});
				$('.center-vertical').each(function() {
					var section = $(this).closest("section"),
						position = section.height() - $(this).outerHeight();
					$(this).css({position: "absolute", top: position / 2});
					section.find(".prev").each(function() {
						var pagenav = (position - ($(this).outerHeight() / 4)) / 4;
						if (pagenav < 40) { $(this).css({top: pagenav}); }
						else { $(this).removeAttr("style"); }
					});
					section.find(".next").each(function() {
						var pagenav = (position - ($(this).outerHeight() / 4)) / 4;
						if (pagenav < 40) { $(this).css({bottom: pagenav}); }
						else { $(this).removeAttr("style"); }
					});
				});
			} else {
				$('.row.full-height').removeAttr("style");
				$('.center-vertical').removeAttr("style");
				$(".row#top > div:first-child").removeAttr("style");
				$(".row#contact > #googlemaps").removeAttr("style");
			}
		});
		$('.highlight pre code').each(function() {
			if ($(this).get(0).scrollWidth > $(this).innerWidth()) { $(this).parent().addClass("rightfade"); }
			else { $(this).parent().removeClass("rightfade"); }
		});
		
	}
	
	function parallax() {
		var scrollTop = $(window).scrollTop(),
			scrollBot = $(window).scrollTop() + $(window).outerHeight();
		$(".row#top").each(function() {
			if (scrollTop <= $(this).outerHeight() + $(this).position().top) {
				var position = scrollTop * 0.3;
				$("div:first-child", this).css({transform: 'translate3d(0, ' + position + 'px, 0)'});
			}
		});
		$(".row#demo").each(function() {
			if (scrollBot >= $(this).position().top && scrollTop <= $(this).position().top + $(this).outerHeight()) {
				var position = scrollBot - $(this).position().top - ($(this).outerHeight() * 1);
				$(".mountains > .mountain_layer_0", this).css({transform: 'translateY(' + position * 0.55 + 'px)'});
				$(".mountains > .mountain_layer_1", this).css({transform: 'translateY(' + position * 0.5 + 'px)'});
				$(".mountains > .mountain_layer_2", this).css({transform: 'translateY(' + position * 0.4 + 'px)'});
				$(".mountains > .mountain_layer_3", this).css({transform: 'translateY(' + position * 0.3 + 'px)'});
				$(".mountains > .mountain_layer_4", this).css({transform: 'translateY(' + position * 0.2 + 'px)'});
				$(".mountains > .mountain_layer_5", this).css({transform: 'translateY(' + position * 0.1 + 'px)'});
			}
		});
		$(".row#contact").each(function() {
			if (scrollBot >= $(this).position().top) {
				var position = scrollTop - $(this).position().top + $("#nav").outerHeight();
				$("#googlemaps", this).css({'transform': 'translate3d(0, ' + position * 0.4 + 'px, 0)'});
				$(".clouds > .cloud_layer_0", this).css({'transform': 'translateY(' + position * 0.2 + 'px)'});
				$(".clouds > .cloud_layer_1", this).css({'transform': 'translateY(' + position * 0.3 + 'px)'});
				$(".clouds > .cloud_layer_2", this).css({'transform': 'translateY(' + position * 0.25 + 'px)'});
				$(".clouds > .cloud_layer_3", this).css({'transform': 'translateY(' + position * 0.25 + 'px)'});
			}
		});
	}
	
	function navColor() {
		var scroll = $(window).scrollTop(), nav = $("#nav").outerHeight() + 1,
			tPos = $(".row#top").position().top, tHeight = $(".row#top").outerHeight(),
			dPos = $(".row#demo").position().top, dHeight = $(".row#demo").outerHeight(),
			cPos = $(".row#contact").position().top, cHeight = $(".row#contact").outerHeight(),
			top = scroll <= tHeight - 1,
			demo = scroll >= dPos - nav && scroll <= dPos + dHeight - nav,
			contact = scroll >= cPos && scroll <= cPos + cHeight - nav;
		if (top || demo || contact) {
			$("#nav").removeClass("bg-primary");
			if (scroll >= dPos - nav && scroll <= dPos) { $("#nav").addClass("bg-demo"); }
			else { $("#nav").removeClass("bg-demo"); }
		} else {
			$("#nav").addClass("bg-primary").removeClass("bg-demo");
		}
	}

	$(document).ready(function () {
		
		// BASIC FUNCTIONS
		
		$(window).on('resize load', function() {
			parallax(); resize();
		}).on('scroll load', function() {
			parallax(); navColor();
		});
		
		$("body").css("padding-top", $("#nav").outerHeight());
		
		$('[data-toggle="tooltip"]').tooltip();

		$('a[href*="#"]:not([href="#"]):not(.anchorjs-link)').click(function(e) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var dest   = $(this).attr('href');
				var target = $(this.hash);
				var scroll = $('body').scrollTop();
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					ga('send', 'event', {eventCategory: 'Navigation', eventAction: 'Click', eventLabel: dest});
					var offset = target.offset().top - $("#nav").outerHeight();
					$('html, body').stop().animate({
						scrollTop: offset
					}, 1000);
					e.preventDefault();
				}
			}
		});

		$('a[href="#"]').click(function(e) { e.preventDefault(); });
		
		
		// TOP SECTION SCRIPTS
		
		$('.validation').prettyValidate();
		
		
		// DEMO SECTION SCRIPTS
		
		$('.demo').prettyValidate({
			valid: function(){
				event.preventDefault();
				alert($(this).serialize());
			}
		});
		
		function wtName(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='name']").popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Text Validation', content: 'Text inputs will only accept letters.<br>It will show an error if any numbers or symbols are found.'});
			if (wt == true) {
				$(".demo input[name='name']").val('John Doe').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).attr("disabled", true);
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtEmail(wt);
					});
				});
			}
		}
		
		function wtEmail(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='email']").popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Email Validation', content: 'Accepts only properly formatted email addresses, ex: <a href="#">email@address.com</a>.'});
			if (wt == true) {
				$(".demo input[name='email']").val('john@email.com').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtName(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtPhone(wt);
					});
				});
			}
		}
		
		function wtPhone(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='phone']").popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Phone Number Validation', content: 'Accepts US formated phone numbers, ex: <code>5555555555</code>, <code>555-555-5555</code>, <code>555 555 5555</code>.'});
			if (wt == true) {
				$(".demo input[name='phone']").val('555-555-5555').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtEmail(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtColor(wt);
					});
				});
			}
		}
		
		function wtColor(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='color']").popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Bootstrap Colorpicker', content: 'prettyValidate uses <a href="http://mjolnic.com/bootstrap-colorpicker/" target="_blank">Bootstrap Colorpicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="http://github.com/mjolnic" target="_blank">Javier Aguilar</a>.'});
			if (wt == true) {
				$(".demo input[name='color']").colorpicker('setValue', '#0275d8').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtPhone(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtDate(wt);
					});
				});
			}
		}
		
		function wtDate(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='date']").popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Bootstrap Datepicker', content: 'prettyValidate uses <a href="http://bootstrap-datepicker.readthedocs.org/en/latest/" target="_blank">Bootstrap Datepicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="https://github.com/eternicode" target="_blank">Andrew Rowls</a>.'});
			if (wt == true) {
				$(".demo input[name='date']").datepicker('setDate', new Date()).change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtColor(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtRange(wt);
					});
				});
			}
		}
		
		function wtRange(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='range']").popover('dispose').popover({html: true, offset: '13 -30', placement: 'right', trigger: trigger, title: 'A Pretty Range', content: 'The value can be displayed by adding the <code>placeholder=\"\"</code> attribute.'});
			if (wt == true) {
				$(".demo input[name='range']").change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var step = setInterval(function() { var newVal = parseInt($(".demo input[name='range']").val()) + 1; if (newVal <= 50) { $(".demo input[name='range']").val(newVal).parent().find("label.value").html(newVal); } else { clearInterval(step); } }, 15);
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtDate(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtTextArea(wt);
					});
				});
			}
		}
		
		function wtTextArea(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo textarea").popover('dispose').popover({html: true, placement: 'left', trigger: trigger, title: 'Textarea Validation', content: 'Accepts all charachters but will return an error if any <code>HTML</code> has been detected.'});
			if (wt == true) {
				$(".demo textarea").val('Some Text').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtRange(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtInputWarning(wt);
					});
				});
			}
		}
		
		function wtInputWarning(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='name']").popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Invalid Text', content: 'If an error is found a visual feedback will be shown.'});
			if (wt == true) {
				$(".demo input[name='name']").val('John Doe 3').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtTextArea(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtInputError(wt);
					});
				});
			}
		}
		
		function wtInputError(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo input[name='email']").popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Missing Text', content: 'If the field is left empty an even more alerting feedback will be shown.'});
			if (wt == true) {
				$(".demo input[name='email']").val('').change().focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var input = $(this),
						prevbutton = '<button type="button" class="popover-prev btn btn-sm btn-secondary">Prev</button>',
						nextbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Next</button>';
					$(prevbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().prev("fieldset").find("input").focus(); wtInputWarning(wt);
					});
					$(nextbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(input).popover('hide').parent().next("fieldset").find("input").focus(); wtResetForm(wt);
					});
				});
			}
		}
		
		function wtResetForm(wt) {
			var trigger = (wt == true) ? 'manual' : 'focus';
			$(".demo button[type='reset']").popover('dispose').popover({html: true, placement: 'right', trigger: trigger, title: 'Reset The Form', content: 'No worries though, if a user wants to start over they can simply reset the form and it will set all of the fields back to default!'});
			if (wt == true) {
				$(".demo button[type='reset']").focus().popover('show').on('shown.bs.popover', function(eventShown) {
					var finishbutton = '<button type="button" class="popover-next btn btn-sm btn-primary">Finish!</button>';
					$(".demo")[0].reset();
					$(finishbutton).appendTo("#" + $(eventShown.target).attr("aria-describedby")).on('click', function() {
						$(".demo button[type='reset']").popover('dispose');
						$(".walkthrough-stop").click();
					});
				});
			}
		}
		
		function wtReset() { wtName(); wtEmail(); wtPhone(); wtPhone(); wtColor(); wtDate(); wtRange(); wtTextArea();  }
		wtReset();
		
		$(".row#demo .walkthrough").click(function() {
			$(".demo")[0].reset();
			if ($(this).hasClass("walkthrough-start")) {
				$(this).removeClass("walkthrough-start").addClass("walkthrough-stop").text("Stop Walkthrough");
				$(".demo").addClass("wt");
				wtName(true);
			} else {
				$(this).removeClass("walkthrough-stop").addClass("walkthrough-start").text("Start Walkthrough");
				$(".demo button, .demo input, .demo textarea").popover('dispose');
				$(".demo").removeClass("wt");
				wtReset();
			}
		});
		
		
		// USAGE SECTION SCRIPTS
		
		anchors.add('#usage h1');
		anchors.add('#usage h4');
		
		hljs.configure({ tabReplace: '    ' });
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
			if (math <= $(this).innerWidth()) { $(this).parent().removeClass("rightfade"); }
			else { $(this).parent().addClass("rightfade"); }
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
		
		
		// CONTACT SECTION SCRIPTS

		$('.contact').prettyValidate();

		var position = [40.0577919, -75.541693];

		function showGoogleMaps() {

			var styles = [
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [{"color": "#444444"}]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [{"color": "#f2f2f2"}]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{"saturation": -100},
						{"lightness": 45}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [{"visibility": "simplified"}]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [{"visibility": "off"}]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [{"color": "#0275d8"}]
				}
			];

			var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

			var latLng = new google.maps.LatLng(position[0], position[1]);

			var mapOptions = {
				zoom: 14,
				center: latLng,
				streetViewControl: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				zoomControl: false,
				scrollwheel: false,
				draggable: false,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};

			map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

			/* marker = new google.maps.Marker({
				position: latLng,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP
			}); */

			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');

		}

		google.maps.event.addDomListener(window, 'load', showGoogleMaps);

	});
			   
}(jQuery);