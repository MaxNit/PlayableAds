const path = require('path');
const gaze = require('gaze');
const fs = require('fs').promises;
const imageSize = require('image-size');

const promiseCall = (fn, ...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, result) =>
      err ? reject(err) : resolve(result)));

const getDataForSprite = (basePath, filePath) => {
  const relativePath = path.relative(basePath, filePath);
  const parsedPath = path.parse(relativePath);

  parsedPath.dir = parsedPath.dir.replace(/\\/g, '/');

  return {
    name: parsedPath.dir ? parsedPath.dir + '/' + parsedPath.name : parsedPath.name,
    ext: parsedPath.ext.slice(1)
  };
}

const imageExtensions = ['png', 'jpeg', 'jpg']

const MIME_TYPES = {
  mp3: 'audio/mp3',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg'
};

class B64BulkPlugin {
  constructor(options = {}) {
    this.options = options;
    this.cache = {};
    this.metaOutput = {
      errors: [],
      warnings: []
    };
  }

  getWatcher(cb) {
    if (this._watcher) {
      cb && cb(undefined, this._watcher);
    } else {
      this._watcher = gaze(
        this.options.glob,
        {
          //...this.options.src.options,
          cwd: this.options.cwd
        },
        (err, watcher) => {
          watcher.on('end', () => {
            this._watcher = null;
          })
          cb && cb(err, watcher);
        }
      );
    }
    return this._watcher;
  }

  apply(compiler) {
    this.compilerContext = compiler.options.context;

    compiler.hooks.run.tapAsync('B64BulkPlugin', (compiler, cb) => {
      this.compile(() => {
        // without closing the gaze instance, the build will never finish
        this.getWatcher().close();
        cb();
      });
    })

    let watchStarted = false;

    compiler.hooks.watchRun.tapAsync('B64BulkPlugin', (watching, watchRunCallback) => {
      this.isInitial = !watchStarted;

      if (watchStarted) {
        return watchRunCallback();
      }

      watchStarted = true;

      this.getWatcher((err, watcher) => {
        err && watchRunCallback(err);

        watcher.on('error', (err) => {
          watchRunCallback(err);
        });

        watcher.on('all', (event, filepath) => {
          this.compile(() => {}, event, filepath);
        });
      });

      return this.compile(watchRunCallback);
    });

    compiler.hooks.emit.tapAsync('B64BulkPlugin', (compilation, cb) => {
      let content = `window['${this.options.name}'] = ${JSON.stringify(this.cache)}`;

      compilation.assets[this.options.name] = {
        source: () => content,
        size: () => content.length
      };

      compilation.errors = compilation.errors.concat(this.metaOutput.errors.map(x => 'b64 plugin: ' + x));
      compilation.warnings = compilation.warnings.concat(this.metaOutput.warnings.map(x => 'b64 plugin: ' + x));
      cb();
    });
  }

  cacheFile(sourceFile, name, extension) {
    if (!MIME_TYPES[extension]) {
      console.log('skipping unsupported file type: ' + sourceFile);

      return
    }

    fs.readFile(sourceFile).then(buffer => {
      this.cache[name] = this.getFileData(buffer, extension);
    });
  }

  getFileData(buffer, extension) {
    if (imageExtensions.includes(extension)) {
      const imageData = imageSize(buffer);

      return {
        src: `data:${MIME_TYPES[extension]};base64,` + buffer.toString('base64'),
        w: imageData.width,
        h: imageData.height,
        r: 1
      }
    }

    return {
      src: `data:${MIME_TYPES[extension]};base64,` + buffer.toString('base64')
    }
  }

  async _compile(event, filepath) {
    let delta;

    if (event && filepath) {
      delta = getDataForSprite(this.options.cwd, filepath);
    }

    const sourceFilesByFolder = this.getWatcher().watched();
    const allSourceFiles = Object.values(sourceFilesByFolder)
      .reduce((allFiles, files) => [ ...allFiles, ...files ], [])
      .filter(x => !x.endsWith(path.sep));

    if (event === 'deleted' && this.cache[delta.name]) {
      delete this.cache[delta.name];
      console.log('removed from cache ' + delta.name)
      //this.logCompiledFiles();
    }

    let sourceImages = allSourceFiles.map(sourceFile => {
      const { name, ext } = getDataForSprite(this.options.cwd, sourceFile);

      if (event === 'changed' && delta.name === name && this.cache[name]) {
        this.cacheFile(sourceFile, name, ext);
        console.log('cache updated ' + name);

        return
      }

      if (this.cache[name]) {
        return
      }

      this.cacheFile(sourceFile, name, ext);
    });
  }

  logCompiledFiles(compiledFilesPaths) {
    console.log('compiled files: ' + compiledFilesPaths)
  }

  compile(compileCallback, event, filepath) {
    this._compile(event, filepath).then(
      compileCallback,
      (err) => {
        console.log(err);
        this.metaOutput.errors.push(err);
        compileCallback();
      }
    );
  }
}

module.exports = B64BulkPlugin;
