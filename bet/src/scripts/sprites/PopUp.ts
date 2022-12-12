import { App } from "../..";
import { AnimatedSprite } from "../core/AnimatedSprite";
import { Container } from "../core/Container";
import { Sprite } from "../core/Sprite";
import { Text } from "../core/Text";
import gsap from "gsap";

export class PopUp extends Sprite {

    private button: Sprite;
    private crossesSequence: AnimatedSprite;
    private textContainer: Container = new Container({});

    constructor(config) {
        config.texture = App.app.getTexture('table');
        super(config);
        this.init();
    }

    private init(): void {
        this.createButton();
        this.addCrossesSequence();
        this.addTexts();
        // this.start();
    }

    private createButton(): void {
        this.button = new Sprite({ name: 'button', texture: App.app.getTexture('get_button') });
        this.button.position.set(0, 149);
        const buttonText = new Text('TAKE IN APP ', {
            align: "right",
            fill: ' #000',
            fontFamily: 'stavki',
            fontSize: 40,
            dropShadowAngle: 0,
        });
        this.button.addChild(buttonText);
        this.addChild(this.button);
    }

    private addCrossesSequence(): void {
        this.crossesSequence = new AnimatedSprite('c', 5, { speed: 0.05 });
        this.addChild(this.crossesSequence);
    }

    private addTexts(): void {
        this.addChild(this.textContainer);

        const tableText1 = new Text('BET £5', {
            align: "right",
            fill: ' #ffffff',
            fontFamily: 'stavki',
            fontSize: 50,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        tableText1.position.set(-75, -20);

        const tableText2 = new Text('GET £30', {
            align: "right",
            fill: ' #fff700',
            fontFamily: 'stavki',
            fontSize: 50,
        });
        tableText2.position.set(65, -20);

        const tableText3 = new Text('IN BONUSES', {
            align: "right",
            fill: ' #ffffff',
            fontFamily: 'stavki',
            fontSize: 55,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        tableText3.position.set(0, 50);
        this.textContainer.addChild(tableText1, tableText2, tableText3);
    }

    public buttonAnimation(): void {
        gsap.timeline({ repeat: -1 })
            .to(this.button.scale, { x: 0.8, y: 0.8, ease: 'power1.easeInOut', duration: .5 })
            .to(this.button.scale, { x: 1, y: 1, ease: 'power1.easeInOut', duration: .5 })
    }

    public start(): void {
        gsap.from(this.scale, { x: 0, y: 0, duration: 1, ease: 'elastic' })
        gsap.to(this, { alpha: 1, duration: 0.3 });
        this.crossesSequence.play();
        this.buttonAnimation();
    }
}