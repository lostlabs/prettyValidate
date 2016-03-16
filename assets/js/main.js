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
				$('.row.full-height').css("height", $(window).height() - $("#nav").outerHeight());
				$('.center-vertical').each(function() {
					$(this).css({
						position: "absolute",
						top: ($(this).closest("section").height() - $(this).outerHeight()) / 2
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
				$("div:first-child", this).css({'transform': 'translate3d(0, ' + position + 'px, 0)'});
			}
		});
		$(".row#demo").each(function() {
			if (scrollBot >= $(this).position().top && scrollTop <= $(this).position().top + $(this).outerHeight()) {
				var position = scrollBot - $(this).position().top - ($(this).outerHeight() * 0.8);
				$(".parallax > .parallax_layer_0", this).css({'transform': 'translateY(' + position * 0.4 + 'px)'});
				$(".parallax > .parallax_layer_1", this).css({'transform': 'translateY(' + position * 0.35 + 'px)'});
				$(".parallax > .parallax_layer_2", this).css({'transform': 'translateY(' + position * 0.3 + 'px)'});
				$(".parallax > .parallax_layer_3", this).css({'transform': 'translateY(' + position * 0.25 + 'px)'});
				$(".parallax > .parallax_layer_4", this).css({'transform': 'translateY(' + position * 0.2 + 'px)'});
				$(".parallax > .parallax_layer_5", this).css({'transform': 'translateY(' + position * 0.1 + 'px)'});
			}
		});
		$(".row#contact").each(function() {
			if (scrollBot >= $(this).position().top) {
				var position = (scrollTop - $(this).position().top + $("#nav").outerHeight()) * 0.3;
				$("#googlemaps", this).css({'transform': 'translate3d(0, ' + position + 'px, 0)'});
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
			contact = scroll >= cPos - nav && scroll <= cPos + cHeight - nav;
		if (top || demo || contact) {
			$("#nav").removeClass("bg-primary");
			if (scroll >= dPos - nav && scroll <= dPos) { $("#nav").addClass("bg-demo"); }
			else if (scroll >= cPos - nav && scroll <= cPos) { $("#nav").addClass("bg-contact"); }
			else { $("#nav").removeClass("bg-demo bg-contact"); }
		} else {
			$("#nav").addClass("bg-primary").removeClass("bg-demo bg-contact");
		}
	}

	$(document).ready(function () {
		
		$(window).on('resize load', function() {
			parallax(); resize();
		}).on('scroll load', function() {
			parallax(); navColor();
		});
		
		$("body").css("padding-top", $("#nav").outerHeight());
		
		anchors.add('#usage h1');
		anchors.add('#usage h4');
		
		$('[data-toggle="tooltip"]').tooltip();
		
		hljs.configure({ tabReplace: '    ' });
		$('figure code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
		
		$('.validation').prettyValidate({
			valid: function(){
				event.preventDefault();
				alert($(this).serialize());
			}
		});

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

		$('a[href="#"]').click(function(e) {
			e.preventDefault();
		});

		$('.contact').prettyValidate();

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