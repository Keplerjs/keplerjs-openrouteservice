/**
 * definition of plugin openrouteservice
 * @type {String}
 * @description settings values https://openrouteservice.org/documentation/#/reference/directions/directions/directions-service
 */
K.Plugin({
	name: 'openrouteservice',
	templates: {
		popupUser: 'popupCursor_ors',
		popupPlace: 'popupCursor_ors',
		popupCursor: 'popupCursor_ors',
		panelSettings: 'panelSettings_ors',
	},
	settings: {
		"openrouteservice": {
			"caching": true,	//cache response by ORS Api"
			"name": "",
			"key": ""
		},
		"public": {
			"openrouteservice": {
				"poisRoutes": true,
				"routeTrackinfo": false,
				"profile": "foot-walking",
				"profiles": [
					"driving-car",
					//"driving-hgv",
					//"cycling-regular",
					//"cycling-road",
					//"cycling-safe",
					"cycling-mountain",
					//"cycling-tour",
					//"cycling-electric",
					//"foot-walking",
					"foot-hiking",
					//"wheelchair"
				]
			}
		}
	}
});