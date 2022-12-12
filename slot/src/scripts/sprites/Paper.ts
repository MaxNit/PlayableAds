import gsap from "gsap";
import { App } from "../..";
import { AnimatedSprite } from "../core/AnimatedSprite";
import { Sprite } from "../core/Sprite";
import { Text } from "../core/Text";

export class Paper extends AnimatedSprite {
    constructor(name, count, options?) {
        super(name, count, options);
        this.scale.set(1.6);
    }

    public open(amount: number): void {
        this.play();
        this.onComplete = () => this.showText(amount);
    }

    public closed(): void {
        this.textures = this.textures.reverse();
        this.play();
        this.onComplete = () => gsap.to(this, { alpha: 0, duration: .3, onComplete: () => this.destroy() });
        App.app.stage.emit('spinUnlock');
    }

    private showText(amount: number): void {
        const text = new Text(amount, {
            fontFamily: 'spin',
            fill: 0x73150e,
            fontSize: 50
        })
        const coin = new Sprite({ texture: App.app.getTexture('coin') });
        coin.position.set(text.x + text.width / 2 + 25, 0);
        coin.scale.set(0.7);
        this.addChild(text, coin);

        gsap.delayedCall(1, () =>  {
            gsap.to([text, coin], { alpha: 0, duration: .3 } );
            this.closed();
        })
    }
}