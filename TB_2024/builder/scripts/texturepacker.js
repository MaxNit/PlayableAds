'use strict';

const gulp = require('gulp'),
      Texturepacker = require('../app/Images/TexturePacker');

process.on('unhandledRejection', err => {
  throw err;
});

const spriteSheet = async() => {
  const texturepacker = new Texturepacker();

  await texturepacker.clean();
  await texturepacker.build();
  await texturepacker.copy();
};

try {
  gulp.series(spriteSheet)();

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