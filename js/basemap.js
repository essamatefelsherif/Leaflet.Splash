/**
 * @func
 * @desc function to load TileLayer objects.
 */
function init_basemap(basemap_layers, title){
	'use strict';

	const basemap_credits = {};

	if(document.location.protocol === 'https:'){

		basemap_layers['Satellite']		= 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
		basemap_layers['Open Street']	= 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
		basemap_layers['Toner']			= 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png';
		basemap_layers['Watercolor']	= 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg';
	}
	else{
		basemap_layers['Satellite']		= 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
		basemap_layers['Open Street']	= 'http://tile.openstreetmap.org/{z}/{x}/{y}.png';
		basemap_layers['Toner']			= 'https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png';
		basemap_layers['Watercolor']	= 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg';
	}

	basemap_credits['Satellite']	= 'Map data ©2015 Google';
	basemap_credits['Open Street']	= '© OpenStreetMap contributors, CC-BY-SA';
	basemap_credits['Toner']		= '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';
	basemap_credits['Watercolor']	= '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';

	for(let i in basemap_layers){
		basemap_layers[i] = L.tileLayer(basemap_layers[i], {attribution:basemap_credits[i]});
	}

	return basemap_layers[title];
}
