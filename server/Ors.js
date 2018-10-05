
var Future = Npm.require('fibers/future');
	//,Openrouteservicejs = Npm.require('openrouteservice-js');

//PATCH for https://github.com/GIScience/openrouteservice-js/issues/4
const orsDir = '.npm/package/node_modules/openrouteservice-js/src/';
const OrsPois = Npm.require(orsDir+'OrsPois');
/*const OrsUtil = Npm.require(orsDir+'OrsUtil');
const OrsInput = Npm.require(orsDir+'OrsInput');
const OrsMatrix = Npm.require(orsDir+'OrsMatrix');
const OrsGeocoding = Npm.require(orsDir+'OrsGeocode');
const OrsIsochrones = Npm.require(orsDir+'OrsIsochrones');
const OrsDirections = Npm.require(orsDir+'OrsDirections');
*/
Kepler.Ors = {
    "Pois": OrsPois,
/*    "Util": OrsUtil,
    "Input": OrsInput,
    "Geocode": OrsGeocode,
    "Isochrones": OrsIsochrones,
    "Directions": OrsDirections,
    "Matrix": OrsMatrix
*/
};


console.log('ORS',K.Ors)