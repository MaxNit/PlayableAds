const buildStatistic = require('../app/BuildStats'),
  { builderConfig } = require('../config/builder/index'),
  gutil = require('gulp-util');

const checkMark = '\u2713',
  crossMark = '\u2716';

function showTotalFiles () {
  console.log(gutil.colors.blue('Total files created: %d'), buildStatistic.getFiles().length)
}

function showFilesExceedLimit () {
  let filesExceedLimit = buildStatistic.getFiles().filter(file => {
    return file.fileSize > builderConfig.apiSettings[file.apiName].fileSizeLimit
  });

  if (!filesExceedLimit.length) {
    return console.log(gutil.colors.green(checkMark + ' The size of all files meets the requirements'));
  }

  console.log(gutil.colors.red(crossMark + ' File size exceeded:'));

  for (let i = 0; i < filesExceedLimit.length; i++) {
    //break on potentially long list
    if (i === 5) {
      console.log(gutil.colors.red('And %d more...'), filesExceedLimit.length - i);
      break;
    }

    console.log(
      '%s - %s [%sMB]',
      filesExceedLimit[i].fileName,
      gutil.colors.red(filesExceedLimit[i].fileSize + 'MB'),
      builderConfig.apiSettings[filesExceedLimit[i].apiName].fileSizeLimit || '???'
    );
  }
}

function showLinks () {
  let links = buildStatistic.getLinks();
  for (let i = 0; i < links.length; i++) {
    console.log(gutil.colors.green(links[i]));
  }
  for (let i = 0; i < links.length; i++) {
    console.log(gutil.colors.green(links[i].replace('/plpl/', '/plbl/device.html?page=')));
  }
}
function showErrors () {
  let ers = buildStatistic.getErrors();
  for (let i = 0; i < ers.length; i++) {
    console.log(gutil.colors.red(ers[i]));
  }
}

module.exports = showBuildStats = (done) => {
    console.group();

    [showTotalFiles, showFilesExceedLimit, showErrors].forEach(fn => {
      fn();
      console.log('');
    })

    console.groupEnd();
    done()
}
