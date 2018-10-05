Package.describe({
  name: "keplerjs:openrouteservice",
  summary: "Keplerjs Openrouteservice API",
  version: "1.3.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "openrouteservice-js": "0.0.1",
});

Package.onUse(function (api) {

  var globsync = function(e){
    var pkg = 'keplerjs_openrouteservice',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");


  //PATCH for https://github.com/GIScience/openrouteservice-js/issues/4
  api.addFiles(globsync('.npm/package/node_modules/openrouteservice-js/src/*.js'),'server');

  api.use([
    'keplerjs:core',
    //'keplerjs:edit'
  ]);

  api.addFiles([
    'plugin.js',
  ]);

  api.addFiles([
    'client/Ors.js',
  ],'client');

  api.addFiles([
    'server/Ors.js'
  ],'server');

//TODO export Ors client and server
});
