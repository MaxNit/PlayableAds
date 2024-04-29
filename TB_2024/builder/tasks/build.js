const gulp = require('gulp'),
  clean = require('gulp-clean'),
  Images = require('../app/Images/Images'),
  Sprites = require('../app/Images/Sprites'),
  JavaScript = require('../app/JavaScript/JavaScript'),
  CSS = require('../app/CSS/CSS'),
  Loader = require('../app/Loader/Loader'),
  Sounds = require('../app/Sounds/Sounds'),
  HTML = require('../app/HTML/HTML'),
  showBuildStats = require('./buildStats'),
  { tempStoragePath } = require('../config/builder/index');

let buildResult = {};

async function images() {
  let images = new Images();

  await images.build();
  buildResult.images = images.result;
}

async function spriteSheetInit() {
  let spriteSheet = new Sprites();

  await spriteSheet.copy();
  buildResult.spriteSheet = spriteSheet.result;
}

async function js() {
  let javaScript = new JavaScript();

  await javaScript.build();
  buildResult.js = javaScript.result;
}

async function css() {
  await new CSS().build();
}

async function loader() {
  await new Loader().build();
}

async function sounds() {
  await new Sounds().build();
}

async function html() {
  await new HTML().build();
}

function writeManifest(cb) {
  require('fs').writeFileSync(require('path').join(tempStoragePath, 'manifest.json'), JSON.stringify(buildResult));
  cb()
}

async function clear() {
  gulp.src(tempStoragePath, { read: false })
    .pipe(clean({ force: true }));
}

exports.build = gulp.series(
  gulp.parallel(images, spriteSheetInit, js, css, loader, sounds),
  writeManifest,
  html,
  clear,
  showBuildStats
);
