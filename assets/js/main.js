!function ($) {
			   
	function em(input) {
		var emSize = parseFloat($("body").css("font-size"));
		return (emSize * input);
	}

	function resize() {
		$(".row.full-height").each(function (){
			if ($(window).width() > em(34)) {
				$(".row.full-height").css("min-height", $(window).height() - 54);
				setTimeout(function(){
					$(".center-vertical").each(function() {
						$(this).css({
							position: "absolute",
							top: ($(this).closest("section").height() - $(this).outerHeight()) / 2
						});
					});
				}, 100);
			} else {
				$(".row.full-height").removeAttr("style");
				$(".center-vertical").removeAttr("style");
			}
		});
	}

	$(document).ready(function () {
		
		$(window).on('resize', function() { resize(); }); resize();

		$('[data-toggle="tooltip"]').tooltip();

		hljs.configure({ tabReplace: '    ' });
		$('figure code').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		$('.validation').prettyValidate({
			valid: function() {
				var form = $('form.validation').serialize();
				alert(form);
			},
			invalid: function() {
				// alert("Error Callback");
			}
		});

		$('a[href*="#"]:not([href="#"])').click(function(e) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				var scroll = $('body').scrollTop();
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					var offset = target.offset().top - 54;
					if (scroll != offset) {
						$('html, body').stop().animate({
							scrollTop: offset
						}, 1000);
					}
					e.preventDefault();
				}
			}
		});

		$('a[href="#"]').click(function(e){
			e.preventDefault();
		});

		$('.contact').prettyValidate();

		$('.highlight').each(function () {
			var btnHtml = '<div class="bd-clipboard"><span class="btn-clipboard" title="Copy to clipboard">Copy</span></div>';
			$(this).before(btnHtml);
			$('.btn-clipboard').tooltip();
		});

		var clipboard = new Clipboard('.btn-clipboard', {
			target: function (trigger) {
				return trigger.parentNode.nextElementSibling;
			}
		});

		clipboard.on('success', function (e) {
			$(e.trigger).attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
			e.clearSelection();
		});

		clipboard.on('error', function (e) {
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