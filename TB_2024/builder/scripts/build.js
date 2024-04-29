'use strict';

const path = require('path'),
  paths = require('../config/paths'),
  spawn = require('react-dev-utils/crossSpawn');

process.on('unhandledRejection', err => {
  throw err;
});

try {
  const result = spawn.sync(
    'gulp',
    ['--gulpfile', path.join(paths.ownPath, '/tasks/build.js'), 'build', '--cwd', paths.appPath, '--color'],
    { stdio: 'inherit' }
  );
  
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log('The build failed because the process exited too early. This probably means the system ran out of memory or someone called `kill -9` on the process.');
    } else if (result.signal === 'SIGTERM') {
      console.log('The build failed because the process exited too early. Someone might have called `kill` or `killall`, or the system could be shutting down.');
    }

    process.exit(1);
  }

  process.exit(result.status);

  ['SIGINT', 'SIGTERM'].forEach(function(sig) {
    process.on(sig, function() {
      process.exit();
    });
  });
} catch (e) {
  if (e && e.message) {
    console.log(e.message);
  }

  process.exit(1);
}
