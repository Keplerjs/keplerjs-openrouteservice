/**
 * definition of plugin openrouteservice
 * @type {String}
 * @description settings values https://openrouteservice.org/documentation/#/reference/directions/directions/directions-service
 */
K.Plugin({
	name: 'openrouteservice',
	templates: {
		popupCursor: 'popupCursor_ors',
		popupGeojson: 'popupGeojson_ors',
		panelSettings: 'panelSettings_ors',
	},
	settings: {
		"openrouteservice": {
			"name": "",
			"key": ""
		},
		"public": {
			"openrouteservice": {
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