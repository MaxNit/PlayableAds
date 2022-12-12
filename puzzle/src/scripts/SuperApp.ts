import { Container } from "./core/Container";
import { Application } from "./core/Application";
import { PictureController } from "./sprites/PictureController";
import gsap from "gsap";
import { Sprite } from "./core/Sprite";

export class SuperApp {

    public app: Application = new Application();

    public bgLayer: Container;
    public mainLayer: Container;
    public uiLayer: Container;

    private isTutor: boolean = true;
    private tutorTimeline: any;

    constructor() {
        this.app.loader.onComplete.add(() => this.init());
    }

    private init(): void {
        this.app.resizeApp();
        this.getLayers();
        this.app.ticker.add(() => this.update());
        this.startPlayble();
        this.setEvents();
        this.app.stage.interactive = true;
    }

    private getLayers(): void {
        this.bgLayer = this.app.getSprite('bgLayer');
        this.mainLayer = this.app.getSprite('mainLayer');
        this.uiLayer = this.app.getSprite('uiLayer');
    }

    private setEvents(): void {
        this.app.stage.on('win', () => this.win());
        window.addEventListener('resize', () => this.restartTutor())
        this.app.stage.on('pointerdown', () => this.stopTutor())
    }

    public startPlayble(): void {
        const picture = this.app.getSprite('picture');
        const panel = this.app.getSprite('panel');
        const pictureController = new PictureController(picture, panel);
        gsap.delayedCall(1, () => this.startTutor());
    }

    private startTutor(): void {
        if (!this.isTutor) return;

        const hand = this.app.getSprite('hand');
        const panelMirror: Sprite = this.app.getSprite('panelMirror');
        const resultMirror: Sprite = this.app.getSprite('resultMirror');

        const pos1 = hand.getLocalPositionFor(panelMirror);
        const pos2 = hand.getLocalPositionFor(resultMirror);

        hand.position.set(pos1.x, pos1.y);
        hand.alpha = 1;

        this.tutorTimeline = gsap.timeline({ repeat: -1, ease: 'Quad.easeInOut' })
            .to(hand.scale, { x: 0.8, y: .8, duration: 0.3 })
            .to(hand, { x: pos2.x, y: pos2.y, duration: 1 })
            .to(hand.scale, { x: 1, y: 1, duration: 0.3 })
            .to(hand.scale, { x: 1, y: 1, duration: 0.3 })
            .to(hand, { x: pos1.x, y: pos1.y, duration: 1 })   
    }

    private restartTutor(): void {
        this.tutorTimeline.pause();
        this.tutorTimeline.clear();
        this.tutorTimeline.kill();
        
        const hand = this.app.getSprite('hand');
        hand.position.set(0, 0);
        hand.alpha = 0;
        hand.scale.set(1, 1);
        gsap.delayedCall(1, () => this.startTutor())
    }

    private stopTutor(): void {
        if (!this.isTutor) return;

        if (this.tutorTimeline) {
            this.tutorTimeline.pause();
            this.tutorTimeline.clear();
            this.tutorTimeline.kill();
        }
        const hand = this.app.getSprite('hand');
        hand.hide();
        this.isTutor = false;
    }

    private win(): void {
        const finalPicture = this.app.getSprite('finalPicture');
        finalPicture.interactive = true;
        gsap.to(finalPicture, { alpha: 1, duration: .4 })
        const hand = new Sprite({ texture: this.app.getTexture('hand'), anchor: { x: .25, y: .15 } });
        hand.scale.set(1.7, 1.7);
        finalPicture.addChild(hand);
        this.finalHandAnimation(hand);
        finalPicture.on('pointerdown', () => this.toStore());
        const panel = this.app.getSprite('panel');
        gsap.to(panel, { alpha: 0, duration: .4 });
    }

    private finalHandAnimation(hand: Sprite): void {
        gsap.to(hand.scale, { x: 1.5, y: 1.5, duration: .5, yoyo: true, repeat: -1, ease: 'Quad.easeInOut' })
    }

    private toStore(): void {
        //
    }

    public ratioSettings() {
        const title = this.app.getSprite('title');
        const panel = this.app.getSprite('panel');
        if (window.innerWidth < window.innerHeight) {
            title.scale.set(0.8, 0.8);
            panel.angle = 0;
        } else {
            title.scale.set(0.4, 0.4);
            panel.angle = 90;
        }
    }

    public update(): void {
        this.ratioSettings();
    }
}
