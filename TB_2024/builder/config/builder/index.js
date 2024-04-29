const paths = require('../paths');
const { playableKey, playableNumber, playableVersion } = require('../playable');
const path = require('path');
const settings = require('./settings');
const { gameConfig } = require('./games');

const getTempStoragePath = () => {
  return path.join(paths.ownPath, getTempStorageFolderName())
};

const getTempStorageFolderName = (separateFolder = true) => {
  let folderName = 'temp';

  if (separateFolder) {
    folderName = `temp-${playableKey}-${playableVersion}`
  }

  return folderName
};

module.exports = {
  tempStoragePath: getTempStoragePath(),
  builderConfig: settings.getExtendedSettings(),
  gameConfig
};
