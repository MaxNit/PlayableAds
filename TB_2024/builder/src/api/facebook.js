window.onload = function(){
    if (typeof superApp !== 'undefined') {
        superApp.init();
    }
};

window.clickInstall = function(){
    FbPlayableAd.onCTAClick()
}