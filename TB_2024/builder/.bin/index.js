#!/usr/bin/env node
'use strict';

const spawn = require('react-dev-utils/crossSpawn');

process.on('unhandledRejection', err => {
    throw err;
});

const args = process.argv.slice(2);

const scripts = ['start', 'spritesheet', 'texturepacker', 'build'];
const script = args[0];
const nodeArgs = [];

if (scripts.includes(script)) {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .concat(args.slice(1)),
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
} else {
    console.log('Unknown script "' + script + '".');
}
