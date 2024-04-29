import { Container } from "./Container";

export class Scene extends Container {
    constructor(config) {
        super(config);
        this.blurFilter = new PIXI.filters.BlurFilter(0, 0);
        this.node.filters = [this.blurFilter];
        this.blurFilter.blur = 0;
    }

    blurIn() {
        const tweenObject = { blur: 0 };
        this.tweens.animate(tweenObject, { blur: 20 }, { time: 300, on: { update: () => this.blurFilter.blur = tweenObject.blur } });
    }
}