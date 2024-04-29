const path = require('path');

const { tempStoragePath } = require('./index'),
  { playableConfig } = require('../playable'),
  { builderConfig } = require('../../config/builder/index'),
  manifest = require(path.join(tempStoragePath, 'manifest.json'));

const resolveObjectPath = (object, path) => path.split('.').reduce((o, p) => o ? o[p] : undefined, object);

const getResources = (type, tempPath, apiName, isFullPath) => {
  let result,
    manifestProp = resolveObjectPath(manifest, type);

  if (manifestProp && manifestProp[apiName]) {
    result = manifestProp[apiName];
  } else {
    result = manifestProp['default'];
  }

  if (isFullPath) {
    return path.join(tempPath, result);
  } else {
    return result;
  }
}

const getConfig = (apiName, isFullPath) => getResources('js.config', path.join(tempStoragePath, 'js/config'), apiName, isFullPath);
const getLibs = (apiName, isFullPath) => getResources('js.libs', path.join(tempStoragePath, 'js/libs'), apiName, isFullPath);
const getBaseImages = (apiName, isFullPath) => getResources('images.basic', path.join(tempStoragePath, 'images'), apiName, isFullPath);
const getSpriteSheet = (apiName, isFullPath) => getResources('images.basic', path.join(tempStoragePath, 'sprites'), apiName, isFullPath);

//@todo подумать как это лучше оформить
const getSounds = (apiName, isFullPath) => {
  if (!playableConfig.builderSettings || !playableConfig.builderSettings.sounds) {
    return false;
  }

  let settings = builderConfig.apiSettings && builderConfig.apiSettings[apiName];

  if (settings &&
    settings.builderSettings &&
    typeof settings.builderSettings.sounds !== 'undefined') {
    return settings.builderSettings.sounds ? 'sounds.js' : false
  } else {
    if (isFullPath) {
      return path.join(tempStoragePath, 'sounds/sounds.js');
    } else {
      return 'sounds.js';
    }
  }
};

const getLangImages = (lang, isFullPath) => isFullPath ? path.join(tempStoragePath, `images/langs/${lang}.js`) : `${lang}.js`;

const getApp = isFullPath => isFullPath ? path.join(tempStoragePath, 'js/app.min.js') : 'app.min.js';

const getCSS = () => path.join(tempStoragePath, 'css/style.css');

const getLoaderCSS = () => path.join(tempStoragePath, 'loader/loader.css');

module.exports = {
  getConfig,
  getLibs,
  getBaseImages,
  getSpriteSheet,
  getSounds,
  getLangImages,
  getApp,
  getCSS,
  getLoaderCSS
};
