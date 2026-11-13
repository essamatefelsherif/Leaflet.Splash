/**
 * @module  demo_splash_1
 * @desc    module to implement a splash screen prior to loading the Leaflet full map screen.
 * @version v1.0.0
 * @author  Essam A. El-Sherif
 */

/** @const map_center {object} - fixed map center throughout all screens */
const map_center = L.latLng(28.652031, 30.750732);

/** @const map_zoom {number} - fixed zoom level throughout all screens */
const map_zoom = 5;

/** @var map_elt {object} - variable to hold the HTMLElement object */
let map_elt;

/** @var map_1 {object} - variable to hold the Leaflet Map object */
let map_1;

/** @var basemap_layers {object} - variable to hold the TileLayer objects */
let basemap_layers = {};

/** @var basemap_layers {object} - variable to hold the default TileLayer object */
let basemap_default;

/**
 * @func
 * @desc function to run upon loading the web page.
 */
window.onload = () => {
	'use strict';

	basemap_default = init_basemap(basemap_layers, 'Open Street');

	map_elt = document.getElementById('mapid');

	map_1 = L.map(map_elt,{zoomControl:false, attributionControl:false, dragging:true, doubleClickZoom:'center', scrollWheelZoom:'center'});

	splash_screen();
};

/**
 * @func
 * @desc function to display the map splash screen.
 */
function splash_screen(){
	'use strict';

	map_1.options.minZoom = 4; map_1.options.maxZoom = 18;
	map_1.setView(map_center, map_zoom);

	let map_bounds = map_1.getBounds();

	basemap_default.addTo(map_1);

	let banner_center = L.latLng(map_center.lat - 6, map_center.lng);
	let banner_marker = L.marker(banner_center, { opacity: 0.0, riseOnHover: true, bubblingMouseEvents: true });

	let banner = 'EGYPT';
	banner += '<div class="small"><span class="divide">welcome to</span> exploring the map</div>';
	banner += '<div class="small">click to proceed</div>';

	banner_marker.addTo(map_1);
	banner_marker.bindTooltip('', { direction: 'center', permanent: true, interactive: true, className: 'egy-banner'} );

	setTimeout(() => {
		banner_marker.getTooltip().setContent(banner);
	}, 350);

	let f1, f2;
	map_1.on('resize zoomend', f1 = function (e){
		this.fitBounds(map_bounds);
	});

	map_1.on('dragend',f2 = function (e){
		this.panTo(map_center);
	});

	banner_marker.once('click', function(){
		banner_marker.remove();

		map_1.off('resize zoomend', f1);
		map_1.off('dragend',f2);

		map_elt.classList.remove('background');

		map_1.invalidateSize(true);
		map_1.setView(map_center, map_zoom);

		let count = 0, elt;
		let t = setInterval(function(){
			if(count++ < 12){
				map_1.invalidateSize(true);
				map_1.setView(map_center, map_zoom);
			}else{
				clearInterval(t);
				map_1.setView(map_center, map_zoom);

				elt = document.getElementById('frame');
				L.DomUtil.removeClass(elt, 'background');

				elt = document.getElementsByTagName('body')[0];
				L.DomUtil.removeClass(elt, 'background');

				map_controls();
			}
		}, 100);
	});
}

/**
 * @func
 * @desc function to add controls to the map screen.
 */
function map_controls(){
	'use strict';

	let ribbon = document.getElementsByClassName('esm-ribbon');
	ribbon[0].parentNode.removeChild(ribbon[0]);

	map_1.options.doubleClickZoom = map_1.options.scrollWheelZoom = true;

	/* add zoom control */
	let control_zoom = L.control.zoom({position:'topleft'});
	control_zoom.addTo(map_1);

	/* add scale control */
	let control_scale = L.control.scale({imperial:false, maxWidth:100});
	control_scale.addTo(map_1);

	/* add baselayers control */
	let control_layers_base = L.control.layers(basemap_layers, {}, {position:'topright', title: 'Baselayers'});
	control_layers_base.addTo(map_1);

	/* add attribution control */
	let control_attr = L.control.attribution({position:'bottomright'});
	control_attr.addTo(map_1);
}
