import * as PIXI from 'pixi.js';
import { App } from '../..';
import { Utils } from './utils';

export class AnimatedSprite extends PIXI.AnimatedSprite {
    constructor(name, count, options?) {
        const textures = Utils.addAnimationSequence(name, count);
        super(textures);
        this.anchor.set(.5);
        if (options !== undefined) this.setOptions(options);
    }

    private setOptions(options): void {
        options.speed !== undefined ? this.animationSpeed = options.speed : 0.05;
        options.loop !== undefined ? this.loop = options.loop : this.loop = true;
    }
}