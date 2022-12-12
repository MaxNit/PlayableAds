import gsap from "gsap";
import { App } from "../..";
import { AnimatedSprite } from "../core/AnimatedSprite";
import { Sprite } from "../core/Sprite";
import { Text } from "../core/Text";


export class PaperFinal extends AnimatedSprite {
    constructor(name, count, options?) {
        super(name, count, options);
        this.scale.set(2);
    }

    public open(): void {
        this.play();
        this.onComplete = () => this.showText();
    }

    private showText(): void {
        const style = {
            fontFamily: 'spin',
            fill: 0x73150e,
            fontSize: 25
        }
        const text1 = new Text('2200', style);
        const text2 = new Text('WELCOME BONUS', style);
        const text3 = new Text('+500 FREE SPINS', style);
        const button = this.getButton();
        text1.position.set(0, -80);
        text2.position.set(0, -30);
        text3.position.set(0, 20);
        button.position.set(0, 70);
        this.addChild(text1, text2, text3, button);
    }

    private getButton(): Sprite {
        const button = new Sprite({ texture: App.app.getTexture('button') });
        const text = new Text('INSTALL', {
            fontFamily: 'spin',
            fill: 0x4a100d,
            fontSize: 30
        })
        button.addChild(text);
        gsap.to(button.scale, { x: 1.2, y: 1.2, duration: 0.3, repeat: -1, yoyo: true })
        return button;
    }
}