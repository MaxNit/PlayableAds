window.addEventListener('load', function() {
    var is_ready_app, is_ready_timer;
    var ROOT_URL = '',
        CLICK_URL = '';

    if (typeof LIFTOFF_ROOT_URL !== 'undefined') {
        ROOT_URL = LIFTOFF_ROOT_URL
    }

    if (typeof LIFTOFF_CLICK_URL !== 'undefined') {
        CLICK_URL = LIFTOFF_CLICK_URL
    }

    var counter = 0;
    js('loader.js', function(){
        counter++;

        if (counter == 2) {
            next();
        }
    });
    css('styles.css', function(){
        counter++;

        if (counter == 2) {
            next();
        }
    });

    function next() {
        loader.create();

        setTimeout(function(){
            is_ready_timer = true;
            init();
        }, 1000);

        js('app.js', function(){
            is_ready_app = true;
            init();
        });
    }

    function init() {
        if (is_ready_timer && is_ready_app) {
            if (typeof superApp !== 'undefined') {
                superApp.init();
            } else {
                initGame()
            }


            if (typeof loader != 'undefined') {
                loader.clear();
            }
        }
    }


    function js(name, cb) {
        var script = document.createElement('script');
        script.src = ROOT_URL + name;
        document.getElementById('scripts-container').appendChild(script);
        script.onload = function(){
            if (cb) {
                cb();
            }
        }
    }
    function css(name, cb) {
        var style = document.createElement( 'link' );
        style.href = ROOT_URL + name;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.media = 'screen,print';
        document.getElementById('styles-container').appendChild(style);
        style.onload = function(){
            if (cb) {
                cb();
            }
        }
    }

    window.clickInstall = function() {
        window.open(window._LIFTOFF_ENV.pinpointURL, '_blank');
    }
});

