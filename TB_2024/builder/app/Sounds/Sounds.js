const path = require('path'),
  { tempStoragePath } = require('../../config/builder/index');

const ConvertBase64 = require('../helpers/ConvertBase64');

class Sounds {
    build() {
        return new Promise(async (resolve, reject) => {
            await ConvertBase64.build({
                folder: `./src/sounds/`,
                src: `./**/*.mp3`,
                dist: this.getTempStorage(),
                fileName: `sounds.js`,
                variableName: 'b64'
            });

            resolve(this);
        });
    }

    getTempStorage(folder = '') {
        return path.join(tempStoragePath, 'sounds', folder)
    }
}

module.exports = Sounds;
