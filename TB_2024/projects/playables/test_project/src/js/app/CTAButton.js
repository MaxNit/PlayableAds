import { Container } from "./Core/renderElements/Container";

const elementConfig = {
    children: {
        btn: { texture: 'ctaButton/btn-big' },
        playNow: { texture: 'ctaButton/play_now', y: -6 },
        hand: { texture: 'finger', anchor: { x: 0.1, y: 0.1 }, x: 130, y: 80, alpha: 0 }
    }
}

export class CTAButton extends Container {
    
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.hand = this.child('hand');
        this.node.interactive = true;
        this.node.on('pointertap', (e) => {
            e.stopPropagation();
            superApp.app.inStore()
        });
    }

    async startAnimation() {
        this.hand.tweens.run({ alpha: 1 }, { time: 150 });
        await this.hand.tweens.run({ x: 100, y: 20 }, { time: 300, ease: PIXI.tween.Easing.inOutSine() });
        this.hand.tweens.run({ angle: -5 }, { time: 350, pingPong: true, ease: PIXI.tween.Easing.inOutSine() });
        await this.tweens.scaleTo({ x: 0.9, y: 0.9 }, { time: 350, pingPong: true, ease: PIXI.tween.Easing.inOutSine() });
        this.hand.tweens.run({ alpha: 0 }, { time: 150 });
        await this.hand.tweens.run({ x: 130, y: 80 }, { time: 300, ease: PIXI.tween.Easing.inOutSine() });
        await this.tweens.wait(1500);
        this.startAnimation();
    }
}