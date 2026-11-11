/**/
let basemap_layers = {}, basemap_default;

/**/
let map_1, map_center, map_elt;

/**
 * @func
 * @desc
 */
window.onload = () => {

	basemap_default = init_basemap(basemap_layers, 'Open Street');

	map_elt= document.getElementById('mapid');

	map_center = L.latLng(28.652031, 30.750732); map_zoom = 5;

	var wc = document.getElementById('welcome-content');
	wc.addEventListener('click', wLinkClick, {once: true});

	function wLinkClick(){
		var w1 = document.getElementById('welcome-1');
		var w2 = document.getElementById('welcome-2');

		w1.style.width = '0';
		w2.style.width = '0';

		this.remove();
	}

	var w2 = document.getElementById('welcome-2');
	w2.addEventListener('transitionend', wTransitEnd, {once: true});

	function wTransitEnd(){
		var w  = document.getElementById('welcome');
		w.remove();

		init_map();
	}
};

/**
 * @func
 * @desc
 */
function init_map(){
	map_elt.style.display = 'block';
	map_1 = L.map(map_elt, {center: map_center, zoom: map_zoom, zoomControl: false, attributionControl: false});
	basemap_default.addTo(map_1);

	map_1_screen();
}

/**
 * @func
 * @desc
 */
function map_1_screen(){
	let ribbon = document.getElementsByClassName('esm-ribbon');
	ribbon[0].parentNode.removeChild(ribbon[0]);

	map_1.options.doubleClickZoom = scrollWheelZoom = true;

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
