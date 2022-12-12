import * as PIXI from 'pixi.js';

export class Text extends PIXI.Text {
    constructor(text, configStyle) {
        super(text)
        this.style = new PIXI.TextStyle(configStyle);
        this.anchor.set(.5);
    }
}