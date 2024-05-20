import { App } from "..";
import { Sprite } from "./Core/RenderElements/Sprite";

export class Background extends Sprite {

    constructor(config: any) {
        super(config);
    }

    protected onResize(): void {
        const x = App.size.width / 2;
        const y = App.size.height / 2;
        this.node.position.set(x, y);
    }
}