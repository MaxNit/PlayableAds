import { RenderElement } from "./RenderElement";

export class SpriteFrameAnimation extends RenderElement {
    constructor(config) {
        super(config);
        this.textureName = this.config.textureName;
    }

    createNode() {
        const textures = [];
        for (let i = 0; i < this.config.count; i++) {
            const texture = utils.getTexture(`${this.config.textureName}/${i}`);
            textures.push(texture);
        }
        const animation = new PIXI.AnimatedSprite(textures);

        animation.anchor.set(.5);
        animation.animationSpeed = this.config.speed || 0.5;
        animation.loop = false;

        return animation;
    }

    play() {
        this.node.play();
    }
}