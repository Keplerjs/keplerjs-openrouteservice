
Kepler.Ors = {

	locs: new ReactiveVar([]),

	routeByLocs: function(locs, cb) {

		Meteor.call('findRouteByLocs', locs, function(err, data) {

			K.Ors.locs.set([]);

			if(err) {
				console.log('findRouteByLocs',err)
			}
			else if(data) {

				console.log('findRouteByLocs', data);
				//var feature = K.Util.geo.createFeature('Point', [loc[1],loc[0]], data);
				//feature.templateMarker = 'markerOrs';
				//feature.templatePopup = 'popupGeojson_ors';
				var feature = {
					type: "Feature",
					style: { "color": "#36f", "weight": 14, "opacity": 0.5 },
					geometry: data.routes[0].geometry
				};

				var geojson = K.Util.geo.createFeatureColl([feature]);

				K.Map.hideCursor();
				K.Map.addGeojson(geojson);
				/*, null, function() {
					K.Map.layers.geojson.invoke('openPopup');
				});*/

				if(_.isFunction(cb)) 
					cb(geojson);
			}
		});
	},
};