"use strict";

export default class SuperApp extends PIXI.utils.EventEmitter {
    constructor(applicationClass, props = {}) {
        super();
        this.applicationClass = applicationClass;
        this.props = props;
    }

    init(data = {}) {
        this.setIsIOS();

        window.is_adwords = typeof is_adwords !== "undefined";

        this.app = new this.applicationClass(this.props);

        if (data.before) {
            data.before();
        }

        if (!this.isDapi) {
            this.resize(this.screenSize());
            this.addEventResize();
        }

        this.app.run();

        this.addEventFirstAction();

        if (data.after) {
            data.after();
        }

        return this;
    }

    skipAd() {
        this.app.skipAd();
    }

    setIsIOS() {
        if (!window.is_ios && typeof window.is_ios !== "boolean") {
            let nav = navigator.userAgent || navigator.vendor || window.opera;
            window.is_ios = (/iPad|iPhone|iPod/.test(nav) || (/Intel Mac/.test(nav))) && !window.MSStream;
        }
    }

    addEventFirstAction() {
        const app = this.app

        function firstAction() {
            window.removeEventListener("touchstart", firstAction);
            window.removeEventListener("mousedown", firstAction);

            if (typeof firstUserAction != "undefined") {
                firstUserAction();
            }
        }

        window.addEventListener("touchstart", firstAction);
        window.addEventListener("mousedown", firstAction);
    }

    addEventResize() {
        window.addEventListener("orientationchange", () => {
            this.resize(this.screenSize());
        });
        window.addEventListener("resize", () => {
            this.resize(this.screenSize());
        });
    }

    resize(screenSize) {
        if (this.isNotFirstResize) {
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }

            this.resizeTimeout = setTimeout(() => {
                this.app.resizeApp(screenSize.width , screenSize.height);
            }, 50)
        } else {
            this.isNotFirstResize = true;
            this.app.resizeApp(screenSize.width , screenSize.height);
        }
    }

    get isDapi() {
        if (typeof dapi !== "undefined" && typeof dapi.getScreenSize !== "undefined") {
            return true;
        }
        return false
    }

    screenSize() {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}