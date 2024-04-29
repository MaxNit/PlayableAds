var logStyle = {
  system: 'color:#000000; background: #ffcc99',
  analytics: 'color:#000000; background: #99ccff',
  default: '',
};

function logSystem(msg) {
  console.log('%csystem%c %s', logStyle.system, logStyle.default, msg);
}

function logAnalytics(msg) {
  console.log('%canalytics%c %s', logStyle.analytics, logStyle.default, msg);
}

window.onload = function () {
  var nav = navigator.userAgent || navigator.vendor || window.opera;
  var ios = (/iPad|iPhone|iPod/.test(nav) || (/Intel Mac/.test(nav))) && !window.MSStream;

  window.clickInstall = function () {
    ios ? window.open(stores.ios) : window.open(stores.gp, '_blank');
  }

  window.firstUserAction = function () {
    logSystem('firstUserAction');
  };

  window.playableFinished = function () {
    logSystem('playableFinished');
  };

  if (typeof superApp !== 'undefined') {
    superApp.init({
      before: function () {
      }
    });
  }
};
