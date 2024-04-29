import { Sprite } from "../Core/renderElements/Sprite";

export class Cloud extends Sprite {
    constructor(config) {
        super(config);
        this.from = this.config.from;
        this.to = this.config.to;

        this.node.position.set(this.from.x, this.from.y);
        this.startAnimation();
    }

    startAnimation() {
        this.tweens.run({ x: this.to.x, y: this.to.y }, { time: 15000, pingPong: true, loop: true })
    }
}