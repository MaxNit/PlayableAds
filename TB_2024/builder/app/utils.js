let path = require('path'),
    fs = require('fs-extra'),
    Confirm = require('prompt-confirm');

module.exports = {
    createFolder: (pathFolder) => {
        return new Promise((resolve, reject) => {
            fs.mkdirs(pathFolder, () => {
                resolve();
            });
        });
    },

    createFile: (data) => {
        return new Promise(async (resolve, reject) => {
            await fs.mkdirs(data.parent);

            fs.writeFile(path.join(data.parent, data.name), data.content, 'utf-8', function(err){
                if (err) {
                    reject(err)
                }
                resolve()
            });
        });
    },

    asyncCallFunctions: (data) => {
        let counter = 0;
        return new Promise((resolve, reject) => {
            data.funs.forEach((fun) => {
                (async () => {
                    await fun.call(data._this);
                    counter++;
                    if (counter === data.funs.length) {
                        resolve();
                    }
                })();
            })
        });
    },

    readFolder: (folder) => {
        return fs.readdirSync(folder);
    },

    getFolders: (folder) => {
        let list = fs.readdirSync(folder);

        list = list.filter(function(file){
            return fs.statSync(path.join(folder, file)).isDirectory();
        });

        return list;
    },

    getFiles: (folder) => {
        let list = fs.readdirSync(folder);

        list = list.filter(function(file){
            return !fs.statSync(path.join(folder, file)).isDirectory();
        });

        return list;
    },

    ask: (question) => {
        return new Promise((resolve, reject) => {
            new Confirm(question).run()
                .then(function(answer) {
                    resolve(answer)
                });
        });
    }
}
