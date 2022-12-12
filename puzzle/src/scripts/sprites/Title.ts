import { App } from "../..";
import { Sprite } from "../core/Sprite";

export class Title extends Sprite {
    constructor(config) {
        config.texture = App.app.getTexture('taskText');
        super(config);
    }
}