/**
 * @module  demo_splash_2
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

	map_elt= document.getElementById('mapid');

	let wc = document.getElementById('splash-text');
	wc.addEventListener('click', wLinkClick, {once: true});

	function wLinkClick(){
		let w1 = document.getElementById('splash-img-1');
		let w2 = document.getElementById('splash-img-2');

		w1.style.width = '0';
		w2.style.width = '0';

		this.remove();
	}

	let w2 = document.getElementById('splash-img-2');
	w2.addEventListener('transitionend', wTransitEnd, {once: true});

	function wTransitEnd(){
		let w  = document.getElementById('splash-container');
		w.remove();

		init_map();
	}
};

/**
 * @func
 * @desc display the map screen.
 */
function init_map(){
	'use strict';

	map_elt.style.display = 'block';
	map_1 = L.map(map_elt, {center: map_center, zoom: map_zoom, zoomControl: false, attributionControl: false});
	basemap_default.addTo(map_1);

	map_controls();
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
