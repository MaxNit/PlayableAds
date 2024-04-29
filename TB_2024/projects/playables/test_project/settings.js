"use strict";

const GLOBAL_SETTINGS_PLAYABLE = {
  versions: [ // эти параметры пердаются в переменную window.GLOBAL_SETTINGS_PLAYABLE (см. const.js)
    {
      title: 'full',
      versionID: 'v1'
    },
    {
      title: 'misclick',
      versionID: 'v2',
      misclick: true
    },
    {
      title: 'autoredirect',
      versionID: 'v3',
    },
  ]
}

const COMMON_LIBS = ["pixi.min.js", "pixi-tween.js"];
const SOUND_LIBS = ["pixi-sound.js"];

module.exports = {
  viewSettings: {
    size: [1390, 640],
    size_min: [853, 640],
    crop: true,
    adaptive: true
  },
  builderSettings: {
    imagesFolder: "base",
    sounds: true,
    commonLibs: COMMON_LIBS,
    soundLibs: SOUND_LIBS,
  },
  // apiSettings: {
  //   adwords: false
  // },
  GLOBAL_SETTINGS_PLAYABLE
}

