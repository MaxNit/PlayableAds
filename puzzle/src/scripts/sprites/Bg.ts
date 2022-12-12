import { Graphics } from "pixi.js";
import { Container } from "../core/Container";

export class Bg extends Container {
    constructor(config) {
        super(config);
        this.init();
    }

    private init(): void {
        const bg = new Graphics();
        bg.beginFill(0xb0fcff);
        bg.drawRect(-1390 / 2, -1390 / 2, 1390, 1390);
        bg.endFill();
        this.addChild(bg);
    }
}