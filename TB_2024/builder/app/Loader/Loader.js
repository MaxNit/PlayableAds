const gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    stylus = require('gulp-stylus'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    base64 = require('gulp-base64-inline'),
    paths = require('../../config/paths'),
    { tempStoragePath } = require('../../config/builder/index');

class Loader {
    constructor() {
        this.result = {};
    }

    async build() {
        await this.buildJS();
        await this.buildCSS();
    }

    buildJS() {
        return new Promise((resolve, reject) => {
            gulp.src(path.join(paths.ownSrc, 'loader/loader.js'))
                .pipe(uglify({
                    mangle: false,
                    compress: {
                        drop_console: false
                    }
                }).on('error', gutil.log))
                .pipe(gulp.dest(this.getTempStorage()))
                .on('finish', () => {
                    resolve();
                })
        });
    }

    buildCSS() {
        return new Promise((resolve, reject) => {
            gulp.src(path.join(paths.ownSrc, 'loader/loader.styl'))
                .pipe(stylus())
                .pipe(base64())
                .pipe(cssmin())
                .pipe(gulp.dest(path.join(this.getTempStorage())))
                .on('finish', () => {
                    resolve()
                });
        });
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'loader', folder)
    }
}

module.exports = Loader;
