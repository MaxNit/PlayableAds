"use strict";
exports.__esModule = true;
exports.resources = exports.parseResourses = void 0;
var fs = require('fs');
var folderName = './src/assets/img';
var MIME_TYPES = {
    mp3: 'audio/mp3',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg'
};
function parseResourses() {
    var assets = [];
    function parseAssets(url) {
        fs.readdirSync(url).forEach(function (file) {
            var isFolder = fs.lstatSync("".concat(url, "/").concat(file)).isDirectory();
            console.log(isFolder);
            console.log(file);
            if (isFolder) {
                parseAssets(url + '/' + file);
            }
            else {
                var name_1 = file.split('.')[0];
                var dist = url + '/' + file;
                var ext = file.split('.')[1];
                if (fs.lstatSync(dist).isDirectory()) {
                    console.log(dist);
                    parseAssets(dist);
                }
                var src = encode_base64(dist, ext);
                var config = { name: name_1, src: src };
                assets.push(config);
            }
        });
    }
    parseAssets(folderName);
    console.log('DONE');
    return "<script type=\"text/javascript\"> window[\"res\"] = ".concat(JSON.stringify(assets), " </script>");
}
exports.parseResourses = parseResourses;
function encode_base64(filename, extension) {
    if (fs.lstatSync(filename).isDirectory())
        return;
    var data = fs.readFileSync(filename);
    return "data:".concat(MIME_TYPES[extension], ";base64,").concat(Buffer.from(data).toString('base64'));
}
exports.resources = parseResourses;
