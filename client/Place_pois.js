
if( K.settings.public.openrouteservice.poisRoutes ) {

Kepler.Place.include({

	loadPoisTracks: function(poisGeojson, cb) {

		var self = this;

		_.each(poisGeojson.features, function(poi) {

			var placeLoc = [self.loc[1],self.loc[0]],
				poiLoc = poi.geometry.coordinates;

			Meteor.call('findRouteByLocs', [placeLoc, poiLoc], function(err, feature) {

				if(err) {
					console.log('findRouteByLocs',err)
				}
				else if(feature) {

					//if(Template['popupGeojson_tracks'])
					//	feature.templatePopup = 'popupGeojson_tracks';
				
					var routeGeojson = K.Ors.routeToGeojson(feature);

					cb.call(self, routeGeojson);
				}
			});
		});
			
		return this;
	}
});

}