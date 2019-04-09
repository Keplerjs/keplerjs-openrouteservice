
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
		try {
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
				console.warn("Ors: getDirections Error",err.message);
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
			data = K.Cache.get({locs: locs, opts: opts}, 'ors_routes', function(o) {
				return K.Ors.getDirections(o.locs, o.opts);
			});
		else
			data = K.Ors.getDirections(locs, opts);
		
		if(!data)
			return null;

		var	route = data.routes[0],
			geom = route.geometry,
			sum  = route.summary,
			prop = sum ? {
				len: sum.distance,
				time: sum.duration
			} : {};

		var feature = {
			type: "Feature",
			//properties: prop,
			geometry: geom
		};

		if(K.settings.public.openrouteservice.routeTrackinfo) {
			feature.properties = K.Geoinfo.getTrackInfo(feature);
		}

		return feature;
	}
});