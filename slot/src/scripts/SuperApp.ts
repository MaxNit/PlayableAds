import { Container } from "./core/Container";
import { Application } from "./core/Application";
import gsap from "gsap";
import { Text } from "./core/Text";
import { SlotMachine } from "./sprites/SlotMachine/SlotMachine";
import { Paper } from "./sprites/Paper";
import { Panel } from "./sprites/Panel";
import { PaperFinal } from "./sprites/PaperFinal";
import { CoinFx } from "./sprites/CoinFx";


const slotMachineScenarios = [
    {
        item: 'K',
        amount: 500,
    },
    {
        item: 'man',
        amount: 700,
    },
    {
        item: 'ra',
        amount: 1000,
    }
]


export class SuperApp {

    public app: Application = new Application();

    public bgLayer: Container;
    public mainLayer: Container;
    public uiLayer: Container;

    private slotMachine: SlotMachine;
    private panel: Panel;
    private paperFinal: PaperFinal;
    private countSpins: number = 0;

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
        this.app.stage.on('spin', () => this.spinSlotMachine());
    }

    public startPlayble(): void {
        this.slotMachine = this.app.getSprite('slotMachine');
        this.panel = this.app.getSprite('panel');
        this.paperFinal = new PaperFinal('po', 4, { loop: false, speed: 0.3 });

        this.paperFinal.visible = false;
        this.uiLayer.addChild(this.paperFinal);

        const spinNowContainer = this.app.getSprite('spinNowContainer');
        const spinNow = new Text('SPIN NOW', {
            fontFamily: 'spin',
            fill: 0xffffff
        })
        spinNowContainer.addChild(spinNow);
        spinNowContainer.bounceAnimation(0.2, 1);
    }

    private spinSlotMachine(): void {
        this.slotMachine.start(slotMachineScenarios[this.countSpins].item);

        gsap.delayedCall(3, () => this.setPaperScenario())
    }

    private setPaperScenario(): void {
        const paper = new Paper('po', 4, { loop: false, speed: .3 });
        const amount = slotMachineScenarios[this.countSpins].amount;
        paper.open(amount);
        this.panel.updateAmount(amount);
        this.mainLayer.addChild(paper);
        this.countSpins++;
        this.checkWin();    
    }

    private checkWin(): void {
        if (this.countSpins !== 3) return;

        gsap.delayedCall(1.5, () => {
            this.paperFinal.visible = true;
            this.paperFinal.open();
            const blackRect = this.app.getSprite('blackRect');
            blackRect.show();
            gsap.to(blackRect, { alpha: 0.6, duration: .3 });
            const fx: CoinFx = this.app.getSprite('coinFx');
            fx.start();
        }) 
    }

    private toStore(): void {
        //
    }

    public ratioSettings() {
        const panel = this.app.getSprite('panel');
        if (window.innerWidth < window.innerHeight) {
            this.slotMachine.scale.set(0.9, 0.9);
            panel.scale.set(0.8);
        } else {
            this.slotMachine.scale.set(1.3, 1.3);
            panel.scale.set(0.7);
        }
    }

    public update(): void {
        this.ratioSettings();
    }
}
