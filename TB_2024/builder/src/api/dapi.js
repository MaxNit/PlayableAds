var app, screenSize, isInitGame, isAudioEnabled;

dapi.isReady() ? onReadyCallback() : dapi.addEventListener("ready", onReadyCallback); 

function onReadyCallback(){
    dapi.removeEventListener("ready", onReadyCallback);

    if(dapi.isViewable()){
        adVisibleCallback({isViewable: true});
    }
    
    dapi.addEventListener("viewableChange", adVisibleCallback);
    dapi.addEventListener("adResized", adResizeCallback);
    dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
}

function startGame() {
    if (isInitGame) { return; }
    isInitGame = true;
    screenSize = dapi.getScreenSize();
    isAudioEnabled = !!dapi.getAudioVolume();
    setTimeout(function() {
        superApp.init({
            before: function() {
                app = superApp;
                volumeGame();
                resizeGame();
                if (typeof loader !== 'undefined') {
                    loader.clear();
                }
            }
        });
    }, 500);
}

function resizeGame() {
    if (!app) { return; }
    app.resize({
        width: screenSize.width,
        height: screenSize.height
    });
}

function volumeGame() {
    if (!app) { return; }

    if (isAudioEnabled) {
        app.app.sounds.unmute()
    } else {
        app.app.sounds.mute()
    }
}

function adVisibleCallback(event){
    if (event.isViewable){
        startGame();
    }
}

function adResizeCallback(event){
    screenSize = event;
    resizeGame();
}

function audioVolumeChangeCallback(volume) {
    isAudioEnabled = !!volume;

    volumeGame();
}

window.clickInstall = function(){
    dapi.openStoreUrl();
}
