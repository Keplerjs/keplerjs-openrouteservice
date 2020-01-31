
Kepler.Ors = {

	track: K.Util.geo.featureColl(),

	style: { "color": "#0078cd", "weight": 12, "opacity": 0.6 },

	styleJoin: { "color": "#0078cd", "weight": 12, "opacity": 0.4, "dashArray": "1,14" },

	locs: new ReactiveVar([]),

	routeToGeojson: function(feature) {

		var self = this,
			locs = self.locs.get();

		var lineStart = K.Util.geo.feature('LineString', [
			_.first(locs),
			_.first(feature.geometry.coordinates)
		]);
		lineStart.style = self.styleJoin;

		var lineEnd = K.Util.geo.feature('LineString', [
			_.last(locs),
			_.last(feature.geometry.coordinates)
		]);
		lineEnd.style = self.styleJoin;

		var pointStart = K.Util.geo.feature('Point', _.first(locs));
		var pointEnd = K.Util.geo.feature('Point', _.last(locs));
		pointStart.templateMarker = 'marker_ors_start';
		pointEnd.templateMarker = 'marker_ors_end';
		pointStart.classMarker = 'marker-blue';
		pointEnd.classMarker = 'marker-blue';
		
		feature.style = self.style;

		return K.Util.geo.featureColl([
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

		var point = K.Util.geo.feature('Point', loc);
		point.classMarker = 'marker-blue';

		if(locs.length < maxLocs){
			locs.push(loc);	
			//self.locs.set(locs);
		}
		
		if(locs.length < maxLocs)
			point.templateMarker = 'marker_ors_start';
		else
			point.templateMarker = 'marker_ors_end';
		
		K.Map.addGeojson(K.Util.geo.featureColl([point]), {
			clear: false, 
			noFitBounds: true
		});

		if(locs.length >= maxLocs) {

		    self.routeLoadTrack();
		}

		if(!self._alert)
			self._alert = K.Alert.info(i18n('error_ors_directions_to'));
		else {
			K.Alert.close(self._alert);
			self._alert = null;
		}

		return this;
	},

	routeLoadTrack: function() {

		var self = this,
			locs = self.locs.get();

		Meteor.call('findRouteByLocs', locs, function(err, feature) {

			if(err || !feature) {
				K.Map.cleanGeojson();
				self.locs.set([]);	
			}
			else if(feature) {

				if(Template['popupGeojson_tracks'])
					feature.templatePopup = 'popupGeojson_tracks';
			
				var geojsonRoute = K.Ors.routeToGeojson(feature);

				K.Map.hideCursor();
				K.Map.addGeojson(geojsonRoute, {
					clear: false
				});//*/

				self.locs.set([]);
			}
		});

		return this;
	},
};