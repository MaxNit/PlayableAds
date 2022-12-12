import { Sprite as PIXISprite, Sprite } from "../core/Sprite";
import { App } from "../..";
import gsap from 'gsap/all';
import { boomSound, crackingSound, digitsSound } from "../sounds";
import { AnimatedSprite } from "../core/AnimatedSprite";

export class Box extends Sprite {

    private boxGlow: Sprite;
    public type: number = 0;
    public cracksValue: number = 0;

    constructor(config) {
        super(config);
        this.cracksValue = 0;
        this.type = config.type;
        this.addGlow();
        this.addTop();
        this.position.set(config.x, config.y);
        this.interactive = true;
        this.on('pointerdown', () => this.addCrack());
        this.alpha = 0;
    }

    private addGlow() {
        const glow = new Sprite({ texture: App.app.getTexture('box_glow') });
        glow.name = 'boxGlow';
        glow.y = -50;
        glow.alpha = 0
        this.addChild(glow);
        this.boxGlow = glow;
    }
ƒ
    private addTop() {
        const top = new Sprite({ texture: App.app.getTexture('box_top') })
        top.name = 'boxTop';
        top.y = -50;
        this.addChild(top);
        top.on('pointerdown', () => this.addCrack());
    }

    private shakingBox() {
        const shakingTm = gsap.timeline({ repeat: -1 })
        shakingTm
            .to(this, { angle: -1.5, duration: 0.05, ease: 'Power.easeInOut' })
            .to(this, { angle: 1.5, duration: 0.05, ease: 'Power.easeInOut' })
    }

    private addCrack() {
        this.cracksValue++;
        crackingSound.play();
        if (this.cracksValue === 1) {
            gsap.to(this.boxGlow, { alpha: .3, duration: .3 })
            this.shakingBox();
            const c1 = new Sprite({
                name: 't_1',
                y: -50,
                texture: App.app.getTexture('t2')
            })
            c1.scale.set(1.3)
            this.addChild(c1);
            gsap.fromTo(c1, { alpha: 0 }, { alpha: 1, duration: 1 })
        } else if (this.cracksValue === 2) {
            gsap.to(this.boxGlow, { alpha: .7, duration: .3 })
            const c2 = new Sprite({
                name: 'c_2',
                y: -50,
            })
            c2.position.set(-10, 0);
            c2.texture = App.app.getTexture('t3');
            c2.scale.set(1.3)
            const c3 = new Sprite({
                name: 'c_3',
                y: -50,
            })
            c3.texture = App.app.getTexture('t4');
            c3.scale.set(1.5)
            this.addChild(c2, c3);
            gsap.fromTo(c2, { alpha: 0 }, { alpha: 1, duration: 1 })
            gsap.fromTo(c3, { alpha: 0 }, { alpha: 1, duration: 1, delay: .5 })
        } else if (this.cracksValue === 3) {
            gsap.to(this.boxGlow, { alpha: 1, duration: .3 })
            const c4 = new Sprite({
                name: 'c_4',
                x: -20,
                y: -50,
            })
            c4.texture = App.app.getTexture('t5');
            c4.scale.set(0.6)
            this.addChild(c4);
            gsap.fromTo(c4, { alpha: 0 }, { alpha: 1, duration: 1,onComplete: () => this.bang()  })
            App.countBoxes++;
            if (App.countBoxes === 3) {
                setTimeout(() => App.toPackshot(), 2000);
            }
        }
    }

    private bang() {
        boomSound.play();
        const bangTm = gsap.timeline();
        bangTm
            .to(this.scale, { x: 1.2, y: 1.2, duration: 1.5, ease: 'elastic' })
        const boost = new AnimatedSprite('b', 15, { loop: false, speed: .5 });
        boost.y = -30;
        boost.scale.set(1.5);

        boost.onComplete = () => {
            App.app.stage.emit('addBonus', { x: this.x, y: this.y }, this.type)
            this.visible = false;
            this.removeChild(boost)
            digitsSound.play();
        };

        boost.play();
        this.addChild(boost);
    }

    private onStage() {
        gsap.fromTo(this, { y: -500 }, {
            y: 170, duration: .5, onComplete: () => {
                const dust = new AnimatedSprite('d', 7, { loop: false, speed: 0.2 });
                dust.onComplete = () => this.removeChild(dust);
                dust.anchor.set(.5);
                dust.play();
                this.addChild(dust);
            }
        })
        this.alpha = 1;
    }
}