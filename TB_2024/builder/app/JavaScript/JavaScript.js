const gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream');

const paths = require('../../config/paths'),
    { tempStoragePath, builderConfig } = require('../../config/builder/index'),
    { playableConfig } = require('../../config/playable');

let utils = require('../utils');

class JavaScript {
    constructor() {
        this.result = {};
    }

    build() {
        
        return new Promise(async (resolve, reject) => {
            await utils.asyncCallFunctions({
                funs: [this.buildApi, this.buildConfig, this.buildLibs, this.buildApp],
                _this: this
            });

            resolve();
        })
    }

    buildApp() {
        let entry = paths.appIndexJs;

        return new Promise((resolve, reject) => {
            browserify({ debug: true })
              .transform(babelify, { presets: ['babel-preset-es2015'].map(require.resolve) })
              .require(entry, { entry: true })
              .bundle()
              .on('error', gutil.log)
              .pipe(source('app.js'))
              .pipe(streamify(
                uglify({
                  mangle: false,
                  compress: {
                      drop_console: true
                  }
                }).on('error', gutil.log))
              )
              .pipe(streamify(concat('app.min.js')))
              .pipe(gulp.dest(this.getTempStorage()))
              .on('finish', async () => {
                  /*gulp.src(path.join(this.getTempStorage(), 'app.js'))
                      .pipe(gulp.dest('./dist/dev'));*/

                  resolve();
              })
        });
    }

    buildApi() {
        return new Promise((resolve, reject) => {
            gulp.src(path.join(paths.ownSrc, '/api/**/*.js'))
                .pipe(uglify({
                    mangle: false,
                    compress: {
                        drop_console: false
                    }
                }).on('error', gutil.log))
                .pipe(gulp.dest(this.getTempStorage('api')))
                .on('finish', () => {
                    resolve(this);
                });
        });
    }

    buildConfig() {
        let tempPath = this.getTempStorage('config');

        this.result.config = {};

        return new Promise((resolve, reject) => {
            gulp.src(path.join(tempPath, '*.js'), { read: false })
                .pipe(clean({
                    force: true
                }))
                .on('finish', () => {
                    let counter = 0;
                    let advancedSettingsCounter = 0;

                    let check = (apiName) => {
                        counter++;

                        this.result.config[apiName] = `${apiName}.js`;

                        if (counter === (advancedSettingsCounter + 1)) {
                            resolve();
                        }
                    }

                    for (let apiName in builderConfig.apiSettings) {
                        if (!builderConfig.apiSettings[apiName].viewSettings) {
                            continue;
                        }

                        advancedSettingsCounter++;

                        let _settings = Object.assign({}, playableConfig.viewSettings, builderConfig.apiSettings[apiName].viewSettings);
                        
                        // let _settings = Object.assign({}, builderConfig.viewSettings, builderConfig.apiSettings[apiName].viewSettings);

                        utils.createFile({
                            content: `window.config = ${JSON.stringify(_settings, null, false)}`,
                            parent: tempPath,
                            name: `${apiName}.js`
                        }).then(() => {
                            check(apiName);
                        });
                    }

                    utils.createFile({
                        content: `window.config = ${JSON.stringify(playableConfig.viewSettings, null, false)}`,
                        parent: tempPath,
                        name: 'default.js'
                    }).then(() => {
                        check('default');
                    });
                });
        });
    }

    buildLibs() {
        let temp = this.getTempStorage('libs');

        this.result.libs = {};

        return new Promise((resolve, reject) => {

            let libs =  playableConfig.builderSettings.libs;

            if (!libs) {
                libs = playableConfig.builderSettings.commonLibs.concat(playableConfig.builderSettings.soundLibs)
            }

            let libSets = {
                default: libs
            }

            for (let apiName in builderConfig.apiSettings) {
                let builderSettings = builderConfig.apiSettings[apiName].builderSettings;

                if (builderSettings && builderSettings.libs) {
                    libSets[apiName] = builderSettings.libs;
                }
            }

            let counter = 0;
            let advancedSettingsCounter = 0;

            for (let apiName in libSets) {
                advancedSettingsCounter++;

                let libs = [];

                libSets[apiName].forEach((lib) => {
                    libs.push(path.join(paths.appSrc, 'assets/libs/', lib))
                });

                let nameFile = `${apiName}.js`;

                gulp.src(libs)
                    .pipe(uglify({
                        mangle: false,
                        compress: {
                            drop_console: true
                        }
                    }).on('error', gutil.log))
                    .pipe(concat(nameFile))
                    .pipe(gulp.dest(temp))
                    .on('finish', () => {
                        counter++;

                        this.result.libs[apiName] = nameFile

                        if (counter === advancedSettingsCounter) {
                            resolve(this);
                        }
                    });
            }
        });
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'js', folder)
    }
}

module.exports = JavaScript;
