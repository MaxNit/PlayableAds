var isGameStart, isOnLoad;
var isReady = false;

var initSuperApp = function() {
    if (isGameStart && isOnLoad && !isReady) {
        isReady = true;

        superApp.init({
            after: function() {}
        });
    }
}

window.onload = function(){
    isOnLoad = true;
    initSuperApp();

    window.gameReady && window.gameReady();
}

window.clickInstall = function(){
    window.install && window.install();
}

window.playableFinished = function(){
    window.gameEnd && window.gameEnd();
}

window.gameStart = function () {
    isGameStart = true;
    initSuperApp();
}

window.gameClose = function () {
    if (typeof superApp !== 'undefined') {}
}
