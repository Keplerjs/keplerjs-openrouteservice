
var Future = Npm.require('fibers/future');
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
		
		var future = new Future();

		try {
			//DOCS https://jsapi.apiary.io/apis/openrouteservice/reference/directions/directions/directions-service.html
			K.Ors.directions.calculate({
				host: K.settings.openrouteservice.host || undefined,
				instructions: false,
				coordinates: locs,
				//profile: "driving-car",
				//profile: "foot-walking",
				profile: opts.profile,
				format: 'geojson',
				//extra_info: ["waytype", "steepness"],
				mime_type: "application/geo+json"
			})
			.then(function(json) {
				
				//console.log('RESPONSe getDirections', json);

				future.return(json);
			})
			.catch(function(err) {
				console.warn("Ors: getDirections Error");
				future.return(null);
			});
		}
		catch(err) {
			console.warn("Ors: getDirections Error");
			future.return(null);
		}

		return future.wait();
	}
};

Meteor.methods({
	findRouteByLocs: function(locs) {

		if(!this.userId) return null;//TODO || !K.Util.valid.locs(loc)) return null;

		locs = _.map(locs, function(l) {
			return K.Util.geo.locRound(l,8);
		});

		var defsOpts = K.settings.public.openrouteservice,
			userOpts = Users.findOne(this.userId, {fields: {'settings.ors': 1} }),
			opts = userOpts.settings.ors ? _.defaults(userOpts.settings.ors, defsOpts) : defsOpts;

		var data = K.Cache.get({locs: locs, opts: opts}, 'routes', function(o) {
			return K.Ors.getDirections(o.locs, o.opts);
		}, K.settings.openrouteservice.cacheTime);
	
		if(!data || !data.features)
			return null;

		var	feature = data.features[0];

		if(K.settings.public.openrouteservice.routeTrackinfo) {
			feature.properties = K.Geoinfo.getTrackInfo(feature);
		}

		return feature;
	}
});