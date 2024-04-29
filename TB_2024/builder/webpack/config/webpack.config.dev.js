const path = require('path');
const b64Plugin = require('../lib/b64-bulk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../../config/paths');
const { isMG, playableConfig } = require('../../config/playable');
const { gameConfig } = require('../../config/builder/index');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
//const webpack = require('webpack');

const spriteSheetBaseName = 'spriteSheetBase.js';
let spriteSheetBaseExist = fs.existsSync(paths.appSpriteSheetBasePath);

let LIBS =  playableConfig.builderSettings.libs;

if (!LIBS) {
  LIBS = playableConfig.builderSettings.commonLibs.concat(playableConfig.builderSettings.soundLibs)
}


const createCopyPluginConfig = () => {

  let config = LIBS.map(lib => {
    return {
      from: path.resolve(paths.appLibsPath, lib),
      to: paths.appBuild,
      cache: true
    }
  });

  config.push(
    {
      from: path.resolve(paths.ownSrc, 'assets/jquery.js'),
      to: paths.appBuild,
      cache: true
    },
    {
      from: path.resolve(paths.ownSrc, 'api/dev.js'),
      to: paths.appBuild,
      cache: true
    }
  );

  spriteSheetBaseExist && config.push({
    from: paths.appSpriteSheetBasePath,
    to: `${paths.appBuild}/${spriteSheetBaseName}`,
    cache: true,
    noErrorOnMissing: true,
  });

  return config

  /*let patterns = playableConfig.builderSettings.libs.map(lib => {
    return {
      from: path.resolve(paths.appLibsPath, lib),
      to: paths.appBuild,
    }
  });

  patterns.push(
    {
      from: path.resolve(paths.ownSrc, 'assets/jquery.js'),
      to: paths.appBuild,
    },
    {
      from: path.resolve(paths.ownSrc, 'api/dev.js'),
      to: paths.appBuild,
    },
  );

  spriteSheetBaseExist && patterns.push({
    from: paths.appSpriteSheetBasePath,
    to: `${paths.appBuild}/${spriteSheetBaseName}`,
    noErrorOnMissing: true,
  });

  return {
    patterns,
    options: { concurrency: 50 }
  }*/
};

module.exports = {
  mode: 'development',
  entry: {
    app: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      fs.existsSync(paths.appIndexDevJs) ? paths.appIndexDevJs : paths.appIndexJs
    ],
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: paths.appBuild,
    filename: '[name].js'
  },
  resolve: {
    mainFiles: ['index']
  },
  module: {
    rules: [
      /**
       * dependencies: @babel/core @babel/preset-env babel-loader
      **/
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },*/
    ]
  },
  plugins: [
    /*new webpack.ProvidePlugin({
      process: 'process/browser',
    }),*/
    new CopyPlugin(createCopyPluginConfig()),
    new b64Plugin({
      cwd: paths.appImagesBasePath,
      glob: '**/*.*',
      output: paths.appBuild,
      name: 'images.base.js'
    }),
    new b64Plugin({
      cwd: paths.appImagesLangsPath,
      glob: '**/*.*',
      output: paths.appBuild,
      name: 'images.langs.js'
    }),
    new b64Plugin({
      cwd: paths.appSoundsPath,
      glob: '**/*.mp3',
      output: paths.appBuild,
      name: 'sounds.js'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.templatesPath, 'index.template'),
      inject: false,
      filename: 'index.html',
      gameConfig,
      playableConfig,
      libsList: LIBS,
      spriteSheetBase: spriteSheetBaseExist && spriteSheetBaseName,
      isMG
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.templatesPath, 'device.template'),
      inject: false,
      filename: 'device.html'
    })
  ]
};
