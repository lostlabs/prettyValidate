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
		
		$(".demo input[name='name']").popover({ html: true, placement: 'left', trigger: 'focus',
			title: 'Text Validation',
			content: 'Text inputs will only accept letters.<br>It will show an error if any numbers or symbols are found.'
		});
		
		$(".demo input[name='email']").popover({ html: true, placement: 'right', trigger: 'focus',
			title: 'Email Validation',
			content: 'Accepts only properly formatted email addresses, ex: <a href="#">email@address.com</a>'
		});
		
		$(".demo input[name='phone']").popover({ html: true, placement: 'left', trigger: 'focus',
			title: 'Phone Number Validation',
			content: 'Accepts US formated phone numbers, ex: <code>5555555555</code>, <code>555-555-5555</code>, <code>555 555 5555</code>'
		});
		
		$(".demo input[name='color']").popover({ html: true, placement: 'right', trigger: 'focus',
			title: 'Bootstrap Colorpicker',
			content: 'prettyValidate uses <a href="http://mjolnic.com/bootstrap-colorpicker/" target="_blank">Bootstrap Colorpicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="http://github.com/mjolnic" target="_blank">Javier Aguilar</a>.'
		});
		
		$(".demo input[name='date']").popover({ html: true, placement: 'left', trigger: 'focus',
			title: 'Bootstrap Datepicker',
			content: 'prettyValidate uses <a href="http://bootstrap-datepicker.readthedocs.org/en/latest/" target="_blank">Bootstrap Datepicker</a> written by <a href="https://twitter.com/stefanpetre/" target="_blank">Stefan Petre</a> and modified by <a href="https://github.com/eternicode" target="_blank">Andrew Rowls</a>.'
		});
		
		$(".demo input[name='range']").popover({ html: true, offset: '13 -30', placement: 'right', trigger: 'focus',
			title: 'A Pretty Range',
			content: 'The value can be displayed by adding the <code>placeholder=""</code> attribute.'
		});
		
		$(".demo textarea").popover({ html: true, placement: 'left', trigger: 'focus',
			title: 'Textarea Validation',
			content: 'Accepts all charachters but will return an error if any <code>HTML</code> has been detected.'
		});
		
		$(".row#demo .walkthrough").click(function() {
			$(this).attr("disabled", true);
			$(".demo input[name='name']").focus();
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