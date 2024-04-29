import { Container } from "./Core/renderElements/Container";
import { Sprite } from "./Core/renderElements/Sprite";

const elementConfig = {
    texture: 'cell', anchor: { x: 0, y: 0 },
    x: 0,
    y: 0,
    children: {

    }
}

export class Box extends Sprite {
    constructor(config) {
        super(utils.merge(elementConfig, config));
        this.node.interactive = true;
        this.node.on('pointerup', () => console.log('up'));
        this.node.on('pointermove', () => console.log('move'));
        this.node.on('pointerdown', () => console.log('down'));
        this.init();
    }

    async init() {
        await this.tweens.wait(2000);
        await this.moveRight();
        await this.tweens.wait(2000);
        this.moveLeft();
    }

    async moveRight() {
        return this.tweens.run({ x: 500 }, { time: 1000 });
    }

    async moveLeft() {
        return this.tweens.run({ x: 0 }, { time: 1000 });
    }
}