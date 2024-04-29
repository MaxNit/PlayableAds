let glob = require('glob'),
    path = require('path'),
    sizeOf = require('image-size'),
    fs = require('fs');

let utils = require('../utils');

class ConvertBase64 {
    static build(props) {
        let ignore = [];

        if (props.ignore) {
            props.ignore.forEach((item) => {
                ignore.push(path.join(props.folder, item));
            })
        }

        let files = glob.sync(path.join(props.folder, props.src), {
            mark: true,
            ignore: ignore
        });

        let list = {};

        files.forEach((pathUrl) => {
            let relative = path.relative(path.normalize(props.folder), pathUrl),
                ext = path.extname(relative),
                fileName = path.basename(relative, ext),
                baseType = ConvertBase64.getFileBaseType(relative);

            let parse = path.parse(relative);

            if (parse.dir !== '') {
                fileName = `${parse.dir}/${fileName}`.replace(new RegExp('\\' + path.sep, 'g'), '/');
            }

            let data = {
                src: baseType + fs.readFileSync(pathUrl).toString('base64')
            }

            if (ConvertBase64.checkUrlToImage(pathUrl)) {
                let size = sizeOf(pathUrl);

                data.w = size.width;
                data.h = size.height;
                data.r = 1;

                if (fileName.search('@') !== -1) {
                    let split = fileName.split('@');

                    data.r = parseInt(split[1], 10);
                    fileName = split[0];
                }
            }

            list[fileName] = data;
        });

        return new Promise(async (resolve, reject) => {
            await ConvertBase64.createFileFromObject(Object.assign({
                object: list
            }, props));

            resolve();
        });
    }

    static createFileFromObject(props) {
        let object = JSON.stringify(props.object, null, false);
        let str = `window.${props.variableName || props.expandVariable}=`;

        if (props.expandVariable) {
            str += `Object.assign(window.${props.expandVariable}, ${object})`;
        } else {
            str += `${object};`
        }

        return new Promise(async (resolve, reject) => {
            await utils.createFile({
                parent: props.dist,
                name: props.fileName,
                content: str
            });

            resolve();
        });
    }

    static getFileBaseType(pathUrl) {
        let extName = path.extname(pathUrl);

        extName = extName.replace('.','').toLowerCase();

        if (ConvertBase64.checkUrlToImage(pathUrl)) {
            return 'data:image/' + extName + ';base64,'
        } else if (/.*\.mp3|m4a|ogg|wav|wma$/.test(pathUrl)) {
            return 'data:audio/' + extName + ';base64,'
        } else if (/.*\.mp4|webm$/.test(pathUrl)) {
            return 'data:video/' + extName + ';base64,'
        } else if (/.*\.ttf$/.test(pathUrl)) {
            return 'data:application/x-font-ttf;base64,'
        } else if (/.*\.svg$/.test(pathUrl)) {
            return 'data:image/svg+xml;base64,'
        }
    }

    static checkUrlToImage(pathUrl) {
        return /.*\.png|jpg|gif|bmp$/.test(pathUrl);
    }

}

module.exports = ConvertBase64;
