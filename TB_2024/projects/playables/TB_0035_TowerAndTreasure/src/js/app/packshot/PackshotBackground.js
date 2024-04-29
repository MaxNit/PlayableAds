import { Container } from "../Core/renderElements/Container";

export class PackshotBackground extends Container {
    constructor(config) {
        super(config);
        this.drawRect();
    }

    drawRect() {
        const rect = new PIXI.Graphics();
        const width = 1920;
        const height = 1920;
        rect.beginFill(0x000000, 0.5);
        rect.drawRect(-width / 2, -height / 2, width, height);
        rect.endFill();
        this.node.addChild(rect);
    }
}