import { Sprite } from "./Sprite";

export class Background extends Sprite {

    constructor(config) {
        super(config);

        this.node.scale.set(0.7);
        this.onResize();
    }

    onResize() {
        this.node.position.set(superApp.app.screen.width / 2, superApp.app.screen.height / 2);

        if (superApp.app.isPortrait) {
            this.node.scale.set(0.7);
        } else {
            this.node.scale.set(1);
            this.node.y = -200;
        }
    }
}