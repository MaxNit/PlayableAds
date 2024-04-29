export default class Application extends PIXI.Application {
    constructor(data = {}) {
        let is_webgl = PIXI.utils.isWebGLSupported();

        window.is_webgl = is_webgl

        super(
            {
                width: config.size[0],
                height: config.size[1],
                antialias: false,
                resolution: 1,
                transparent: true,
            }
        );

        document.body.appendChild(this.view);
        
        return this;
    }

    run() {
        this.showView();

        this.ticker.add(() => PIXI.tweenManager.update(this.ticker.elapsedMS < 200 ? this.ticker.elapsedMS : 0))
    }

    resizeApp(screenWidth, screenHeight) {
        this.screenRatio = screenWidth / screenHeight;

        this.width = this.origWidth;
        this.height = this.origHeight;

        if (config.crop) {
            this.cropView();
        }

        this.resizeView(screenWidth, screenHeight);
    }

    resizeView(screenWidth, screenHeight) {
        this.renderer.resize(this.width, this.height);

        let canvasWidthStyle, canvasHeightStyle;

        if (this.ratio > this.screenRatio) {
            canvasHeightStyle = Math.round(screenWidth / this.ratio);
            canvasWidthStyle = screenWidth;
        } else {
            canvasWidthStyle = Math.round(screenHeight * this.ratio);
            canvasHeightStyle = screenHeight;
        }

        if (Math.abs(canvasWidthStyle - screenWidth) < 3) {
            canvasWidthStyle = screenWidth;
        }
        if (Math.abs(canvasHeightStyle - screenHeight) < 3) {
            canvasHeightStyle = screenHeight;
        }

        this.renderer.view.style.height = canvasHeightStyle + "px";
        this.renderer.view.style.width = canvasWidthStyle + "px";
        this.renderer.view.style.left = Math.max(((screenWidth - canvasWidthStyle) / 2), 0) + "px";
        this.renderer.view.style.top = Math.max(((screenHeight - canvasHeightStyle) / 2), 0) + "px";
    }

    cropView() {
        let screenRatio = this.screenRatio,
            origRatio = this.origWidth / this.origHeight,
            minScreenRatio = config.size_min[0] / config.size_min[1];

        if (this.isPortrait) {
            if (screenRatio > origRatio) {
                this.height = Math.floor(this.origWidth / (screenRatio < (1 / minScreenRatio) ? screenRatio : (1 / minScreenRatio)));
            }
        } else {
            if (screenRatio < origRatio) {
                this.width = Math.floor(this.origHeight * (screenRatio > minScreenRatio ? screenRatio : minScreenRatio));
            }
        }
    }

    showView(delay = 100) {
        this.view.className += " playable";
        setTimeout(() => {
            this.view.classList.add('visible');
        }, delay);
    }

    inStore() {
        if (typeof clickInstall === "undefined") {
            return;
        }
        clickInstall();
    }

    skipAd() {
        if (this.isSkipLocked) { return; }
        this.isSkipLocked = true;

        // Логика пропуска рекламы
    }

    finish() {
        if (typeof playableFinished != "undefined") {
            playableFinished();
        }
    }

    retry() {
        if (typeof playableRetry != "undefined") {
            playableRetry();
        }
    }

    get origWidth() {
        if (!config.adaptive) {
            return config.size[0];
        }

        return (this.screenRatio < 1) ? config.size[1] : config.size[0];
    }

    get origHeight() {
        if (!config.adaptive) {
            return config.size[1];
        }

        return (this.screenRatio < 1) ? config.size[0] : config.size[1];
    }

    get ratio() {
        return this.width / this.height;
    }

    get isPortrait() {
        return this.ratio < 1;
    }

    get isLandscape() {
        return !this.isPortrait;
    }

    get landscapeRatio() {
        return this.ratio < 1 ? 1 / this.ratio : this.ratio;
    }

    ratioLess(ratio) {
        return this.landscapeRatio < RATIO[ratio.toUpperCase()];
    }
}
