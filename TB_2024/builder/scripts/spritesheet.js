'use strict';

const gulp = require('gulp'),
  Sprites = require('../app/Images/Sprites');

process.on('unhandledRejection', err => {
  throw err;
});

const spriteSheet = async() => {
  const SpriteSheets = new Sprites();

  await SpriteSheets.clean();
  await SpriteSheets.build();
  await SpriteSheets.copy();
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
