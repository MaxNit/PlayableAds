window.addEventListener('load', function() {
    var is_mraid = typeof mraid !== 'undefined';

    var nav = navigator.userAgent || navigator.vendor || window.opera;
    var ios = (/iPad|iPhone|iPod/.test(nav) || (/Intel Mac/.test(nav))) && !window.MSStream;

    function init() {
        if (typeof superApp !== 'undefined') {
            superApp.init();
        } else {
            initGame()
        }
    }

    function isReady() {
        if (mraid.isViewable()) {
            init();
        } else {
            mraid.addEventListener('viewableChange', function(viewable) {
                if (viewable) {
                    mraid.removeEventListener('viewableChange', arguments.callee);
                    init();
                }
            });
        }
    }

    if (is_mraid) {
        if (mraid.getState() == 'loading') {
            mraid.addEventListener('ready', isReady);
        } else {
            isReady();
        }
    } else {
        init();
    }


    window.clickInstall = function(){
        var link = stores.gp
        if (ios) {
            link = stores.ios
        }
        if (is_mraid) {
            mraid.open(link);
        } else {
            window.open(link, '_blank');
        }
    }
})