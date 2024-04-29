import { Container } from "./Core/renderElements/Container";
import { Sprite } from "./Core/renderElements/Sprite";

const elementConfig = {
    children: {
        shadow: { texture: 'chest/shadow', y: 190 },
        top: { texture: 'chest/top' },
        glow: { texture: 'chestGlow', y: -69 },
        itemsHolder: { type: Container },
        bottom: { texture: 'chest/bottom' },
        pearls0: { texture: 'chestItems/0', x: 20, y: 20 },
        pearls1: { texture: 'chestItems/1', x: -100, y: 30 },
    }
}

export class Chest extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.itemsHolder = this.child('itemsHolder');

        this.addItems();
        this.particlesAnimation();
    }

    addItems() {
        for (let i = 0; i < 35; i++) {
            const texture = `chestItems/${utils.getRandomNumber(2, 6)}`;
            const item = new Sprite({ texture });
            item.node.x = utils.getRandomNumber(-180, 180);
            item.node.y = utils.getRandomNumber(-20, -30);
            this.itemsHolder.addChild(item);
        }
    }

    particlesAnimation() {
        for (let i = 0; i < 40; i++) {
            const texture = `shineParticles/${utils.getRandomNumber(0, 2)}`;
            const particle = new Sprite({ texture });
            particle.node.x = utils.getRandomNumber(-170, 170);
            particle.node.y = utils.getRandomNumber(-90, 0);
            setTimeout(() => this.addChild(particle), utils.getRandomNumber(0, 150) * i);
            particle.node.scale.set(utils.getRandomNumber(1, 2.2));
            particle.tweens.scaleTo({ x: 0, y: 0 }, { time: 1500, delay: utils.getRandomNumber(100, 300) });
            particle.tweens.run({ angle: 360 }, { time: 5000, on: { end: () => particle.hide() } });
        }
    }
}