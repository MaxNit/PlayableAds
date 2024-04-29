const SOUNDS_MUTED = window.is_adwords;

export default class Sound {
    constructor(config, app, cb) {
        this.app = app;
        this.config = config;
        this.cb = cb;

        this.ready = false;

        if (typeof window.b64 === "undefined" || Object.keys(window.b64).length === 0) {
            return;
        }

        this.loadSounds();
    }

    loadSounds() {
        try {
            PIXI.sound.useLegacy = this.config.useLegacy;
            PIXI.sound.volumeAll = this.config.volume;

            PIXI.Loader.shared.add(this._getSoundsMap());

            PIXI.Loader.shared.onError.add((err) => {
                console.log(err);
            });

            PIXI.Loader.shared.load((loader, resources) => {
                this.ready = true;

                SOUNDS_MUTED && this.mute()

                this.cb && this.cb();
            });
        } catch (e) {
            console.log(e);
        }
    }

    play(name, config) {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.find(name).play(config);
        } catch (e) {
            console.log('Sound play error: ' + name + '\n', e);
        }
    }

    playIfNotPlaying(name, config) {
        if (!this.ready) {
            return;
        }

        try {
            const sound = PIXI.sound.find(name);
            sound && !sound.isPlaying && sound.play(config);
        } catch (e) {
            console.log('Sound playIfNotPlaying error: ' + name + '\n', e);
        }
    }

    playIfNotSuspended(name, config) {
        if (!this.isAudioContextSuspended()) {
            this.play(name, config)
        }
    }

    stop(name) {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.find(name).stop();
        } catch (e) {
            console.log('Sound stop error: ' + name + '\n', e);
        }
    }

    pause(name) {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.find(name).pause();
        } catch (e) {
            console.log('Sound pause error: ' + name + '\n', e);
        }
    }

    resume(name) {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.find(name).resume();
        } catch (e) {
            console.log('Sound resume error: ' + name + '\n', e);
        }
    }

    mute() {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.muteAll();
        } catch (e) {
            console.log(e);
        }
    }

    getSound(name) {
        if (!this.ready) {
            return;
        }

        try {
            return PIXI.sound.find(name);
        } catch (e) {
            console.log(e);
        }
    }

    unmute() {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.unmuteAll();
        } catch (e) {
            console.log(e);
        }
    }

    toggleMute() {
        if (!this.ready) {
            return;
        }

        try {
            PIXI.sound.toggleMuteAll();
        } catch (e) {
            console.log(e);
        }
    }

    pauseAudioContext() {
        if (this._isSoundLibLoaded()) {
            PIXI.sound.context.paused = true
        }
    }

    resumeAudioContext() {
        if (this._isSoundLibLoaded()) {
            PIXI.sound.context.paused = false
        }
    }

    isAudioContextSuspended() {
        return this._getAudioContextState() === AUDIO_CONTEXT_STATE.suspended
    }

    isMuted() {
        try {
            return PIXI.sound.context.muted
        } catch (e) {
            console.log(e)
        }
    }

    _isSoundLibLoaded() {
        return !!(PIXI.sound && PIXI.sound.context)
    }

    _getAudioContextState() {
        if (this._isSoundLibLoaded() && PIXI.sound.context._ctx) {
            return PIXI.sound.context._ctx.state
        }

        return AUDIO_CONTEXT_STATE.unavailable
    }

    _getSoundsMap() {
        return Object.keys(window.b64).map((key) => ({
            name: key,
            url: window.b64[key].src
        }));
    }
}
