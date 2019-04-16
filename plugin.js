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
			"caching": false,	//cache response by ORS Api"
			"name": "",
			"key": ""
		},
		"public": {
			"openrouteservice": {
				"cacheTime": "daily",
				"poisRoutes": true,
				"routeTrackinfo": true,
				"profile": "foot-hiking",
				"profiles": [
					"driving-car",
					//"driving-hgv",
					//"cycling-regular",
					//"cycling-road",
					//"cycling-safe",
					"cycling-mountain",
					//"cycling-tour",
					//"cycling-electric",
					"foot-hiking",
					//"wheelchair"
				]
			}
		}
	}
});