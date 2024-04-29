import { RenderElement } from "./RenderElement";

export class Container extends RenderElement {
    constructor(config) {
        super(config);
    }

    createNode() {
        return new PIXI.Container();
    }
}