import gsap from 'gsap';
import { Container } from "./core/Container";
import { Application } from "./core/Application";
import { musicSound } from './sounds';
import { Text } from './core/Text';

export class SuperApp {

    public app: Application = new Application();

    public bgLayer: Container;
    public mainLayer: Container;
    public uiLayer: Container;

    public countBoxes: number = 0;

    constructor() {
        this.app.loader.onComplete.add(() => this.init());
    }

    private getLayers(): void {
        this.bgLayer = this.app.getSprite('bgLayer');
        this.mainLayer = this.app.getSprite('mainLayer');
        this.uiLayer = this.app.getSprite('uiLayer');
    }

    private init(): void {
        this.app.resizeApp();
        this.getLayers();
        this.app.ticker.add(() => this.update());
        this.startPlayble();
        this.setEvents();
    }

    private setEvents(): void {
        this.app.stage.on('addBonus', (position, value) => this.addBonus(position, value));
    }

    public startPlayble(): void {
        musicSound.play();      
        const balance = this.app.getSprite('balance');
        const snowFx = this.app.getSprite('snowFx');
        snowFx.start();
    
        gsap.from(balance, { alpha: 0, duration: .5 });
        this.showBoxes();
    }

    private showBoxes(): void {
        const box1 = this.app.getSprite('box1');
        const box2 = this.app.getSprite('box2');
        const box3 = this.app.getSprite('box3');

        box1.onStage();
        gsap.delayedCall(0.5, () => box2.onStage());
        gsap.delayedCall(1, () => box3.onStage());
    }

    private addBonus(position, value): void {
        const freeBetText = new Text('FREEBET', {
            align: "right",
            fill: ' #ffffff',
            fontFamily: 'stavki',
            fontSize: 40,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        freeBetText.position.set(position.x, position.y - 70);
        const freeBetValue = new Text('+' + value, {
            align: "right",
            fill: '#fff700',
            fontFamily: 'stavki',
            fontSize: 40,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        freeBetValue.position.set(position.x, position.y - 20);
        this.mainLayer.addChild(freeBetText, freeBetValue);
        gsap.from([freeBetValue.scale, freeBetText.scale], { x: 1.2, y: 1.2, duration: .5 })
    }

    public toPackshot(): void {
        const blackRect = this.app.getSprite('blackRect');
        gsap.to(blackRect, { alpha: .5, duration: .3 });
        const popUp = this.app.getSprite('popUp');
        popUp.start();
    }

    public ratioSettings() {
        const bgV = this.bgLayer.getChild('bg_v');
        const bgL = this.bgLayer.getChild('bg_l');
        if (window.innerWidth < window.innerHeight) {
            bgV.visible = true;
            bgL.visible = false;
        } else {
            bgV.visible = false;
            bgL.visible = true;
        }
    }

    public update(): void {
        this.ratioSettings();
    }
}
