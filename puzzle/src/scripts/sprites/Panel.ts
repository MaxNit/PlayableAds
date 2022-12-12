import e from "express";
import { App } from "../..";
import { Sprite } from "../core/Sprite";


export class Panel extends Sprite {
    constructor(config) {
        config.texture = App.app.getTexture('panel');
        super(config);
        window.addEventListener('resize', () => this.setAngle());
        this.setAngle();
    }

    private setAngle(): void {
        if (App.app.getOrientation() === 'vertical') {
            this.children.forEach(item => item.angle = 0);
        } else {
            this.children.forEach(item => item.angle = -90);
        }
    }
}