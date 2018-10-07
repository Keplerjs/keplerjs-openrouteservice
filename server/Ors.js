
//var Future = Npm.require('fibers/future');
//require = Npm.require;
//Openrouteservicejs = Npm.require('openrouteservice-js');

//PATCH for https://github.com/GIScience/openrouteservice-js/issues/4
var baseDir = 'openrouteservice-js/src/';

Kepler.Ors = {
	Util: Npm.require(baseDir+'OrsUtil'),
	Pois: Npm.require(baseDir+'OrsPois'),
	Input: Npm.require(baseDir+'OrsInput'),
	//Matrix: Npm.require(baseDir+'OrsMatrix'),
	Geocoding: Npm.require(baseDir+'OrsGeocode'),
	Isochrones: Npm.require(baseDir+'OrsIsochrones'),
	Directions: Npm.require(baseDir+'OrsDirections'),
};

/*
console.log('openrouteservice', K.Ors);
Meteor.startup(function() {

	const Directions = new K.Ors.Directions({
	  api_key: K.settings.openrouteservice.key
	});

	Directions.calculate({
	  coordinates: [[8.690958, 49.404662], [8.687868, 49.390139]],
	  profile: "driving-car",
	  extra_info: ["waytype", "steepness"],
	  geometry_format: "encodedpolyline",
	  format: "json",
	  mime_type: "application/json"
	})
	.then(function(json) {
	  console.log(JSON.stringify(json,false,' ',4));
	})
	.catch(function(err) {
	  var str = "An error occured: " + err;
	  console.log(str);
	});

});*/