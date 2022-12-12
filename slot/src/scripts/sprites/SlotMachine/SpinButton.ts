import gsap from "gsap";
import { App } from "../../..";
import { Sprite } from "../../core/Sprite";


export class SpinButton extends Sprite {

    private locked: boolean = false;

    constructor(config) {
        super(config);
        this.interactive = true;
        this.setEvents();
    }

    private setEvents(): void {
        this.on('pointerdown', () => this.spin());
        App.app.stage.on('spinUnlock', () => this.locked = false);
    }

    private spin(): void {
        if (this.locked) return;
        this.locked = true;

        App.app.stage.emit('spin');
        this.spinAnimation();
    }

    private spinAnimation(): void {
        gsap.to(this, { angle: 720, duration: 2, onComplete: () => this.angle = 0 })
    }
}