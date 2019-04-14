
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

//var Directions = Npm.require(baseDir+'OrsDirections');

//TODO Npm.require(baseDir+'main-template');
//
var Ors = Npm.require('openrouteservice-js');

Meteor.startup(function() {

	if(Ors.Directions) {
		K.Ors.directions = new Ors.Directions({
			api_key: K.settings.openrouteservice.key
		});
	}

});

Kepler.Ors = {

	directions: null,

	getDirections: function(locs, opts) {

		//TODO caching using Util.roundLoc and opts.profile
		//console.log('getDirections...............',opts)
		var future = new Future();
		try {
			//DOCS https://jsapi.apiary.io/apis/openrouteservice/reference/directions/directions/directions-service.html
			K.Ors.directions.calculate({
				//api_key: K.settings.openrouteservice.key,
				//host:'http://localhost:9090',
				instructions: false,
				coordinates: locs,
				profile: opts.profile,
				format: 'geojson',
				//extra_info: ["waytype", "steepness"],
				mime_type: "application/geo+json"
			})
			.then(function(json) {
				future.return(json);
			})
			.catch(function(err) {
				console.warn("Ors: getDirections Error",err);
				future.return(null);
			});
		}
		catch(err) {
			console.warn("Ors: getDirections Error",err.message);
			future.return(null);
		}

		return future.wait();
	}
};

Meteor.methods({
	findRouteByLocs: function(locs) {

		if(!this.userId) return null;//TODO || !K.Util.valid.locs(loc)) return null;

		locs = _.map(locs, function(l) {
			return K.Util.geo.roundLoc(l,8);
		});

		var defsOpts = K.settings.public.openrouteservice,
			userOpts = Users.findOne(this.userId, {fields: {'settings.ors': 1} }),
			opts = userOpts.settings.ors ? _.defaults(userOpts.settings.ors, defsOpts) : defsOpts;

		var data;

		if(K.settings.openrouteservice.caching)
			data = K.Cache.get({locs: locs, opts: opts}, 'routes', function(o) {
				return K.Ors.getDirections(o.locs, o.opts);
			});
		else
			data = K.Ors.getDirections(locs, opts);

		if(!data || !data.features)
			return null;

		var	feature = data.features[0];

		if(K.settings.public.openrouteservice.routeTrackinfo) {
			feature.properties = K.Geoinfo.getTrackInfo(feature);
		}

		console.log(feature.properties)


		return feature;
	}
});