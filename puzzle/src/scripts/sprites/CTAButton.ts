import gsap from "gsap";
import { Sprite } from "../core/Sprite";


export class CTAButton extends Sprite {
    constructor(config) {
        super(config);
        this.on('pointerdown', () => this.toStore());
        this.idleAnimation();
    }

    private idleAnimation(): void {
        gsap.to(this.scale, { x: 0.8, y: 0.8, duration: 1, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})
    }

    private toStore(): void {

    }
}