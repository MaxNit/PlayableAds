(function() {
    var wrapper, loader;

    function create(is_hs) {
        wrapper = document.createElement('div');
        wrapper.className = 'loaderWrapper';

        loader = document.createElement('div');
        loader.className = 'loader';
        wrapper.appendChild(loader);
        document.body.appendChild(wrapper);
        wrapper.className += ' _show';
    }

    window.loader = {
        create: function(){
            create();
        },
        clear: function(){
            wrapper.className += ' _hide';

            setTimeout(function(){
                wrapper.parentNode.removeChild(wrapper);
            }, 600); 
        }
    }
}());