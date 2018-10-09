
var Future = Npm.require('fibers/future');
//require = Npm.require;
//Openrouteservicejs = Npm.require('openrouteservice-js');

//PATCH for https://github.com/GIScience/openrouteservice-js/issues/4
var baseDir = 'openrouteservice-js/src/';
//var Util = Npm.require(baseDir+'OrsUtil');
//var Pois = Npm.require(baseDir+'OrsPois');
//var Input = Npm.require(baseDir+'OrsInput');
//var Matrix = Npm.require(baseDir+'OrsMatrix');
//var Geocoding = Npm.require(baseDir+'OrsGeocode');
//var Isochrones = Npm.require(baseDir+'OrsIsochrones');
var Directions = Npm.require(baseDir+'OrsDirections');
//TODO Npm.require(baseDir+'main-template');
//

Meteor.startup(function() {

	K.Ors.directions = new Directions({
		api_key: K.settings.openrouteservice.key
	});

});

Kepler.Ors = {

	getDirections: function(locs, opts) {

		//TODO caching using Util.roundLoc and opts.profile
		
		var future = new Future();

		//DOCS https://jsapi.apiary.io/apis/openrouteservice/reference/directions/directions/directions-service.html
		K.Ors.directions.calculate({
			coordinates: locs,
			profile: opts.profile,
			//extra_info: ["waytype", "steepness"],
			geometry_format: 'geojson',
			format: 'json',
			mime_type: "application/json"
		})
		.then(function(json) {
			/*if(err)
				future.throw(err);
			else*/
				future.return(json);
		})
		.catch(function(err) {
			console.log("Ors: getDirections Error", err);
		});

		return future.wait();
	}
};

Meteor.methods({
	findRouteByLocs: function(locs) {

		if(!this.userId) return null;//TODO || !K.Util.valid.locs(loc)) return null;

		console.log('Ors: findRouteByLocs', locs);

		var defsOpts = K.settings.public.openrouteservice,
			userOpts = Users.findOne(this.userId, {fields: {'settings.ors': 1} }),
			opts = userOpts.settings.ors ? _.defaults(userOpts.settings.ors, defsOpts) : defsOpts;

		var data = K.Ors.getDirections(locs, opts),
			geom = data.routes[0].geometry;

		var feature = {
			type: "Feature",
			geometry: geom
		};

		feature.properties = K.Geoinfo.getTrackInfo(feature);

		return feature;
	}
});