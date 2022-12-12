import gsap from 'gsap';
import * as PIXI from "pixi.js"
import { App } from '../..';

export class Sprite extends PIXI.Sprite {

    public name: string;
    objectId: string;
    portraitX: number;
    portraitY: number;
    adaptivePosition: boolean;
    devMode: boolean;
    data: any;

    constructor(config: any) {
        super(config.texture);
        config.name !== undefined ? this.name = config.name : this.name = null;
        this.x = config.x || 0;
        this.y = config.y || 0;
        config.visible !== undefined ? this.visible = config.visible : this.visible = true;
        this.alpha = config.alpha !== undefined ? config.alpha : 1;
        config.anchor ? this.anchor.set(config.anchor.x, config.anchor.y) : this.anchor.set(.5, .5);
        if (config.scale) this.scale.set(config.scale.x, config.scale.y);
        this.objectId = config.objectId || null;
        if (config.positions !== undefined) this.setPosition(config.positions);
        if (config.positions !== undefined) window.addEventListener('resize', () => this.setPosition(config.positions));
        this.portraitX = config.portraitX || this.x;
        this.portraitY = config.portraitY || this.y;
        if (config.children !== undefined) this.createChildren(config.children);
    }

    private setPosition(config): void {
        this.position.set(config[`${App.app.getOrientation()}`].x, config[`${App.app.getOrientation()}`].y);
    }

    private createChildren(children): void {
        children.forEach(configItem => {
            const displayObject = App.app.createChildren(configItem);
            this.addChild(displayObject);
        })
    }

    public onClick(func: () => void) { 
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', func);
    }

    getAnchor() {
        return {x: this.anchor.x, y: this.anchor.y};
    }

    public checkCollision(obj: Sprite): boolean {
        return this.x + this.width > obj.x &&
            this.x < obj.x + obj.width &&
            this.y + this.height > obj.y &&
            this.y < obj.y + obj.height
    }

    public show() {
        this.visible = true;
    }

    public hide() { 
        this.visible = false;
    }

    public getChild(name): any {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === name) return this.children[i];
        }
    }
}
