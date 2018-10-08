Package.describe({
  version: "1.3.7",
  name: "keplerjs:openrouteservice",
  summary: "Keplerjs Openrouteservice API",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "openrouteservice-js": "0.0.1",
});

Package.onUse(function (api) {

  var globsync = function(e){
    var pkg = 'keplerjs-openrouteservice',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.3.7',
    //'keplerjs:edit'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/en.js'
  ]);

  api.addFiles([
    'client/Ors.js',
    'client/views/popups.html',
    'client/views/popups.js'
  ],'client');

  api.addFiles([
    'server/Ors.js'
  ],'server');

//TODO export Ors client and server
});
