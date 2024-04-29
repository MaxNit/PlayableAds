let fs = require('fs'),
    path = require('path');

let utils = require('../utils');

let Sprites = require('./Sprites');
let ConvertBase64 = require('../helpers/ConvertBase64');

const { tempStoragePath } = require('../../config/builder/index'),
    { playableConfig, playableLangs } = require('../../config/playable');

class Images {
    constructor() {
        this.result = {};
        this.sprites = new Sprites(this);

        return this
    }

    build() {
        return new Promise(async (resolve, reject) => {
            await utils.asyncCallFunctions({
                funs: [this.buildBase, this.buildLangs],
                _this: this
            });
            resolve()
        })
    }

    buildLangs() {
        let functions = [];

        functions.push(
            ConvertBase64.build({
                folder: `./src/img/langs/`,
                src: `./**/*.{png,jpg}`,
                dist: this.getTempStorage('langs'),
                fileName: `all.js`,
                expandVariable: 'sprites'
            })
        )

        playableLangs.forEach(async (lang) => {
            functions.push(
                ConvertBase64.build({
                    folder: `./src/img/langs/${lang}/`,
                    src: `./**/*.{png,jpg}`,
                    dist: this.getTempStorage('langs'),
                    fileName: `${lang}.js`,
                    expandVariable: 'sprites'
                })
            )
        });

        return new Promise(async (resolve, reject) => {
            await Promise.all(functions);
            resolve(this)
        });
    }

    async buildBase() {
        let apiSettings = playableConfig.apiSettings,
            readyFolders = {};

        this.result.basic = {};

        return new Promise(async (resolve, reject) => {
            let counter = 0,
                advancedSettingsCounter = 0;

            let check = (apiName) => {
                counter++;

                if (counter === (advancedSettingsCounter + 1)) {
                    resolve();
                }
            }

            for (let apiName in apiSettings) {
                let settings = apiSettings[apiName];

                if (!settings ||
                    !settings.builderSettings ||
                    !settings.builderSettings.imagesFolder) {
                    continue;
                }

                advancedSettingsCounter++;

                let imagesFolder = settings.builderSettings.imagesFolder;

                if (imagesFolder === playableConfig.builderSettings.imagesFolder || readyFolders[imagesFolder]) {
                    this.result.basic[apiName] = `${imagesFolder}.js`;
                    check();
                    continue;
                }

                readyFolders[imagesFolder] = true;
                this.result.basic[apiName] = `${imagesFolder}.js`;

                this.buildBaseFolder(imagesFolder)
                    .then(() => {
                        check();
                    });
            }

            this.result.basic['default'] = `${playableConfig.builderSettings.imagesFolder}.js`;
            this.buildBaseFolder(playableConfig.builderSettings.imagesFolder)
                .then(() => {
                    check();
                });
        });
    }

    buildBaseFolder(folderName) {
        return new Promise(async (resolve, reject) => {
            await ConvertBase64.build({
                folder: `./src/img/${folderName}/`,
                src: `./**/*.{png,jpg}`,
                ignore: [`./_**/**/*.{png,jpg}`],
                dist: this.getTempStorage(),
                fileName: `${folderName}.js`,
                variableName: 'sprites'
            });

            resolve();
        });
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'images', folder)
    }
}

module.exports = Images;
