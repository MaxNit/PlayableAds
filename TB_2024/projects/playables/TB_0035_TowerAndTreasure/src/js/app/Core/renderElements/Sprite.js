import { RenderElement } from "./RenderElement";

export class Sprite extends RenderElement {
    constructor(config) {
        super(config);
    }

    createNode() {
        return new PIXI.Sprite(utils.getTexture(this.config.texture));
    }
}