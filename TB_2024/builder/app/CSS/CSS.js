const gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    path = require('path'),
    stylus = require('gulp-stylus'),
    paths = require('../../config/paths'),
    { tempStoragePath } = require('../../config/builder/index');

class CSS {
    build() {
        return new Promise((resolve, reject) => {
            gulp.src(path.join(paths.ownSrc, 'css/*.styl'))
                .pipe(stylus())
                .pipe(cssmin())
                .pipe(gulp.dest(this.getTempStorage()))
                .on('finish', () => {
                    resolve(this)
                });
        });
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'css', folder)
    }
}

module.exports = CSS;
