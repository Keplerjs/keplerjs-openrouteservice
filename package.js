var version = '1.6.6';

Package.describe({
  version: version,
  name: "keplerjs:openrouteservice",
  summary: "Keplerjs Openrouteservice API",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "openrouteservice-js": "0.1.1",
});

Package.onUse(function (api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:geoinfo@'+version
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/en.js'
  ]);

  api.addFiles([
    'client/Ors.js',
    'client/Place_pois.js',
    'client/views/markers.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/popups.html',
    'client/views/popups.js',
    'client/stylesheets/popups.css'
  ],'client');

  api.addFiles([
    'server/Ors.js'
  ],'server');

//TODO export Ors client and server
});
