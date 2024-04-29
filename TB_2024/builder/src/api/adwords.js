window.onload = function(){
    if (typeof superApp !== 'undefined') {
        superApp.init();
    }
};

function initClose() {
    if (ExitApi) {
        ExitApi.delayCloseButton(5);
    }
}

window.clickInstall = function(){
    ExitApi.exit();
}