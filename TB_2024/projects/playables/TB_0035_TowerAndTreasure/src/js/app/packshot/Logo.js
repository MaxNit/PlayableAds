import { Container } from "../Core/renderElements/Container";
import { DevModeBehavior } from '../tools/DevModeBehavior';

const elementConfig = {
    children: {
        main: { texture: 'logo/bg', scale: { x: 0.7, y: 0 } },
        e: { texture: 'logo/e', "x": 188, "y": -87, scale: { x: 0, y: 0 }, angle: -45 },
        l: { texture: 'logo/l', "x": 60, "y": -93, scale: { x: 0, y: 0 }, angle: -45 },
        i: { texture: 'logo/i', "x": -54, "y": -95, scale: { x: 0, y: 0 }, angle: -45 },
        t: { texture: 'logo/t', x: -180, y: -85, scale: { x: 0, y: 0 }, angle: -45 },
        title: { texture: 'logo/title', scale: { x: 0, y: 0 }, alpha: 0 }
    }
}

export class Logo extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.title = this.child('title');
        this.main = this.child('main');
        this.t = this.child('t');
        this.i = this.child('i');
        this.l = this.child('l');
        this.e = this.child('e');

        // new DevModeBehavior(this.e);
    }

    async startAnimation() {
        this.main.tweens.run({ scale: { y: 1 } }, { time: 300, easing: PIXI.tween.Easing.outBack() });
        await this.main.tweens.run({ scale: { x: 1 } }, { time: 200, easing: PIXI.tween.Easing.outCubic() });
        this.t.tweens.run({ scale: { x: 1, y: 1 } }, { time: 400, easing: PIXI.tween.Easing.outBack() });
        this.title.tweens.run({ alpha: 1 }, { time: 100, easing: PIXI.tween.Easing.outCubic() })
        this.title.tweens.run({ scale: { x: 1, y: 1 } }, { time: 300, easing: PIXI.tween.Easing.outBack() });
        this.t.tweens.run({ angle: 0 }, { time: 300, easing: PIXI.tween.Easing.outBack() });
        this.i.tweens.run({ scale: { x: 1, y: 1 } }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 50 });
        this.i.tweens.run({ angle: 0 }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 50 });
        this.l.tweens.run({ scale: { x: 1, y: 1 } }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 100 });
        this.l.tweens.run({ angle: 0 }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 100 });
        this.e.tweens.run({ scale: { x: 1, y: 1 } }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 150 });
        return this.e.tweens.run({ angle: 0 }, { time: 300, easing: PIXI.tween.Easing.outBack(), delay: 150 });
    }

    async lettersAnimation() {
        this.t.tweens.run({ scale: { x: 1.1, y: 1.1 } }, { time: 500, easing: PIXI.tween.Easing.inOutCubic(), pingPong: true });
        this.i.tweens.run({ scale: { x: 1.1, y: 1.1 } }, { time: 500, easing: PIXI.tween.Easing.inOutCubic(), pingPong: true, delay: 50 });
        this.l.tweens.run({ scale: { x: 1.1, y: 1.1 } }, { time: 500, easing: PIXI.tween.Easing.inOutCubic(), pingPong: true, delay: 100 });
        this.e.tweens.run({ scale: { x: 1.1, y: 1.1 } }, { time: 500, easing: PIXI.tween.Easing.inOutCubic(), pingPong: true, delay: 150 });
    }
}