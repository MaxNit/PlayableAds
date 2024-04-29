import { Container } from "../Core/renderElements/Container";
import { SpriteFrameAnimation } from "../Core/renderElements/SpriteFrameAnimation";

export class ItemHolder extends Container {

    constructor(config) {
        super(config);
        this.item = null;
        this.graphics = this.drawHitArea();
    }
    
    drawHitArea() {
        const rect = new PIXI.Graphics();
        const width = 260 / 3;
        const height = 175;
        rect.beginFill(0xff0000, 0.001);
        rect.drawRect(-width / 2, -height / 2, width, height);
        rect.endFill();
        this.node.addChild(rect);
        return rect;
    }

    completeAnimation() {
        this.item.dragComponent.disable();
        const animation = new SpriteFrameAnimation({ textureName: 'blow', count: 17, speed: 0.4, scale: 1.5, y: 15 });
        this.addChild(animation);
        animation.play();
    }
}