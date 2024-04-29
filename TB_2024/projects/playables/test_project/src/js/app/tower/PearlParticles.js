import { Container } from "../Core/renderElements/Container";
import { Sprite } from "../Core/renderElements/Sprite";

export class PearlParticles extends Container {
    constructor(config) {
        super(config);
        this.pearlBar = superApp.app.getElementByID('pearlBar');
    }

    async animate() {
        for (let i = 0; i < 20; i++) {
            const pearlHolder = new Container({});
            const pearl = new Sprite({ texture: 'pearl' });
            const delay = 20 * i;
            const x = utils.getRandomNumber(-100, 100);
            const y = utils.getRandomNumber(40, 60);
            pearl.node.position.set(0, y);
            pearl.node.scale.set(0);
            pearlHolder.addChild(pearl);
            this.addChild(pearlHolder);
            pearlHolder.pearl = pearl;
            pearl.tweens.run({ x }, { time: 300, easing: PIXI.tween.Easing.inCirc(), delay });
            pearl.tweens.run({ y: y - 30 }, { time: 400, easing: PIXI.tween.Easing.inOutSine(), delay, pingPong: true });
            pearl.tweens.scaleTo({ x: 1, y: 1 }, { time: 100, delay });
            this.toBarAnimation(pearlHolder, delay + 700);
        }
        this.pearlBar.pearlAnimation();
        await this.tweens.wait(1000);
        superApp.app.sounds.play('whoosh', { volume: 1.5 });
        return this.tweens.wait(500);
    }

    async toBarAnimation(pearlHolder, delay) {
        pearlHolder.changeParent(this.pearlBar);
        pearlHolder.tweens.run({ x: -70 }, { time: 800, easing: PIXI.tween.Easing.outSine(), delay });
        pearlHolder.tweens.run({ y: 0 }, { time: 800, easing: PIXI.tween.Easing.inSine(), delay });
        await pearlHolder.tweens.scaleTo({ x: 1.2, y: 1.2 }, { time: 400, easing: PIXI.tween.Easing.inSine(), delay });
        await pearlHolder.tweens.scaleTo({ x: 0, y: 0 }, { time: 300, easing: PIXI.tween.Easing.outSine(), delay: 250 });
        superApp.app.sounds.play('bubble', { volume: 0.6 });
        pearlHolder.node.destroy();
    }
}