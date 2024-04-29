const gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    mergeJson = require('gulp-merge-json'),
    spritesheet = require('spritesheet-js'),
    paths = require('../../config/paths'),
    { playableConfig } = require('../../config/playable'),
    { tempStoragePath } = require('../../config/builder/index');

const { exec } = require("child_process");

let utils = require('../utils');
let texturePacker = require('gulp-free-tex-packer');

let fs = require('fs');

class Texturepacker {
    constructor() {
    }

    clean() {
        return new Promise(async (resolve, reject) => {
            gulp.src([
                    path.join(this.getTempStorage()),
                    path.join(paths.appSrc, '/spritesheet/*.js'),
                ], { read: false, allowEmpty: true })
                .pipe(clean({ force: true }))
                .on('finish', () => {
                    resolve();
                });
        });
        
    }

    copy() {
        return new Promise(async (resolve, reject) => {
            gulp.src(path.join(paths.appSrc, '/spritesheet/*.js'), { allowEmpty: true })
                .pipe(gulp.dest(this.getTempStorage()))
                .on('finish', function(){
                    resolve();
                });
        });
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let graphicsSets = this.getGraphicsSets();

            if (!graphicsSets.length) {
                resolve();
                return;
            }

            this.result = {};

            let counter = 0;
            let readySets = {};

            let check = () => {
                counter++;

                if (counter === graphicsSets.length) {
                    resolve();
                }
            }

            for (const graphicsSet of graphicsSets) {
                if (readySets[graphicsSet.name]) {
                    this.result[graphicsSet.apiName] = graphicsSet.name + '.js'
                    check();
                    return;
                }

                readySets[graphicsSet.name] = true;

                await this.buildSetGraphics(graphicsSet);

                if (!graphicsSet.folders) {
                    this.result[graphicsSet.apiName] = false;
                    check();

                    return
                }

                let src = [],
                    srcImg = [];

                graphicsSet.folders.forEach((folderData, i) => {
                    if (!folderData.ignore) {
                        srcImg.push(path.join(this.getTempStorage(), graphicsSet.name, `spritesheet_${folderData.name}.png`));
                    }

                    src.push(path.join(this.getTempStorage(), graphicsSet.name, `spritesheet_${folderData.name}.json`));
                });

                if (srcImg.length) {
                    gulp.src(srcImg, { allowEmpty: true })
                      .pipe(gulp.dest(path.join(paths.appSrc, '/img', graphicsSet.name, '/')));
                }

                gulp.src(src, { allowEmpty: true })
                    .pipe(mergeJson({
                        exportModule: 'window.spritesheets',
                        fileName: graphicsSet.name + '.js'
                    }))
                    .pipe(uglify({
                        mangle: false
                    }).on('error', gutil.log))
                    .pipe(gulp.dest(path.join(paths.appSrc, '/spritesheet/')))
                    .on('finish', () => {
                        this.result[graphicsSet.apiName] = graphicsSet.name + '.js'
                        check();
                    });
            }
        });
    }

    buildSetGraphics(graphicsSet) {
        return new Promise(async (resolve, reject) => {
            let folders = graphicsSet.folders;

            if (!folders) {
                resolve(graphicsSet);
                return;
            }

            let counter = 0;

            for (const folderData of folders) {
                let options = {
                    textureName: `spritesheet_${folderData.name}`,
                    packer: 'MaxRectsPacker',
                    packerMethod: 'Smart',
                    padding: 2,
                    removeFileExtension: true,
                    prependFolderName: false,
                    allowRotation: false,
                    exporter: {
                        allowTrim: true,
                        trimMode: 'crop',
                        fileExt: 'json',
                        content: fs.readFileSync(path.join(__dirname, `./template.tmpl`), 'utf8').replace('{{parent}}', folderData.name)
                    }
                };
                
                gulp.src(path.join(folderData.src, '*.*'))
                    .pipe(texturePacker(options))
                    .pipe(gulp.dest( path.join(this.getTempStorage(), graphicsSet.name)))
                    .on('finish', () => {
                        counter++;
                        if (counter === folders.length) {
                            resolve(graphicsSet)
                        }
                    });
            }
        });
    }

    getGraphicsSets() {
        let apiSettings = playableConfig.apiSettings;

        let graphicsSets = [];

        let data = this.getGraphicsSet(playableConfig.builderSettings.imagesFolder);

        data.apiName = 'default';
        graphicsSets.push(data);

        return graphicsSets;
    }

    getGraphicsSet(folderName) {
        let optionsSpritesheetJs = [
            'notrim',
            'inline',
            'incolumn'
        ]

        let data = {
            name: folderName,
            folders: []
        }

        folderName = `./src/img/${folderName}`

        utils.getFolders(folderName).forEach((folder) => {
            if (folder.substr(0, 1) !== '_') { return; }

            let folderData = {
                src: `${folderName}/${folder}`
            };

            folder = folder.slice(1);

            if (folder.substr(0, 1) === '_') {
                folder = folder.slice(1);
                folderData.ignore = true;
            }

            optionsSpritesheetJs.forEach((option) => {
                if (folder.search(`-${option}`) !== -1) {
                    folder = folder.replace(`-${option}`, '');
                    folderData[option] = true;
                }
            });

            folderData.name = folder;
            data.folders.push(folderData);
        });

        if (!data.folders.length) {
            data.folders = false;
        }

        return data;
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'sprites', folder)
    }
}

module.exports = Texturepacker;
