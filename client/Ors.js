
Kepler.Ors = {

	track: K.Util.geo.createFeatureColl(),

	style: { "color": "#0078cd", "weight": 12, "opacity": 0.6 },

	styleJoin: { "color": "#0078cd", "weight": 12, "opacity": 0.4, "dashArray": "1,14" },

	locs: new ReactiveVar([]),

	routeToGeojson: function(feature) {

		var self = this,
			locs = self.locs.get();

		var lineStart = K.Util.geo.createFeature('LineString', [
			_.first(locs),
			_.first(feature.geometry.coordinates)
		]);
		lineStart.style = self.styleJoin;

		var lineEnd = K.Util.geo.createFeature('LineString', [
			_.last(locs),
			_.last(feature.geometry.coordinates)
		]);
		lineEnd.style = self.styleJoin;

		var pointStart = K.Util.geo.createFeature('Point', _.first(locs));
		var pointEnd = K.Util.geo.createFeature('Point', _.last(locs));
		pointStart.templateMarker = 'marker_ors_start';
		pointEnd.templateMarker = 'marker_ors_end';
		pointStart.classMarker = 'marker-blue';
		pointEnd.classMarker = 'marker-blue';
		
		feature.style = self.style;

		return K.Util.geo.createFeatureColl([
			feature,
			lineStart,
			lineEnd,
			pointStart,
			pointEnd
		]);
	},

	routeAddLoc: function(ll) {

		var self = this,
			maxLocs = 2,
			loc = [ll[1], ll[0]],
			locs = self.locs.get();

		var point = K.Util.geo.createFeature('Point', loc);
		point.classMarker = 'marker-blue';

		if(locs.length < maxLocs)
			locs.push(loc);	
		
		if(locs.length < maxLocs)
			point.templateMarker = 'marker_ors_start';
		else
			point.templateMarker = 'marker_ors_end';
		
		
		K.Map.addGeojson( K.Util.geo.createFeatureColl([point]), {clear:false, noFitBounds:true});

		if(locs.length >= maxLocs) {

		    self.routeLoadTrack();
		}

		if(!self._alert)
			self._alert = sAlert.info(i18n('error_ors_directions_to'));
		else {
			sAlert.close(self._alert);
			self._alert = null;
		}
	},

	routeLoadTrack: function() {

		var self = this;

		Meteor.call('findRouteByLocs', self.locs.get(), function(err, feature) {

			if(err) {
				console.log('findRouteByLocs',err)
			}
			else if(feature) {

				//console.log('findRouteByLocs', feature);

				if(Template['popupGeojson_tracks'])
					feature.templatePopup = 'popupGeojson_tracks';
			
				var geojsonRoute = K.Ors.routeToGeojson(feature);

				console.log('geojsonRoute',geojsonRoute)

				K.Map.hideCursor();
				K.Map.addGeojson(geojsonRoute, null, function() {
					K.Map.layers.geojson.invoke('openPopup');
				});//*/

				self.locs.set([]);
			}
		});
	},
};