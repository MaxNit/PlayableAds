import { Sprite } from "./Sprite";

const configElement = {
    mute: 'icons/soundOff',
    unmute: 'icons/soundOn'
}
export class MuteButton extends Sprite {

    constructor(config) {
        super(config);
        this.node.interactive = true;
        this.node.on('pointerdown', this.onClick, this);
        this.hide();
        this.updateTexture();
        this.checkNetwork();
    }

    onClick() {
        superApp.app.sounds.isMuted() ? superApp.app.sounds.unmute() : superApp.app.sounds.mute();
        this.updateTexture();
    }

    updateTexture() {
        const texture = superApp.app.sounds.isMuted() ? configElement.mute : configElement.unmute;
        this.node.texture = utils.getTexture(texture);
    }

    checkNetwork() {
        if (playableEnv.params && playableEnv.params.showMuteButton) this.show();
        if (playableEnv.apiName == 'default' || playableEnv.apiName == 'mraid') this.show();
    }
}