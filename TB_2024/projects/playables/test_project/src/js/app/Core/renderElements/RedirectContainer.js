import { Container } from "./Container";

export class RedirectContainer extends Container {
    constructor(config) {
        super(config);

        this.hide();
        this.drawRect();
    }

    drawRect() {
        const rect = new PIXI.Graphics();
        rect.beginFill(0xff0000, 0.001);
        rect.drawRect(0, 0, 1920, 1920);
        rect.endFill();
        this.node.addChild(rect);
    }

    enable() {
        superApp.app.finish();
        this.show();
        this.node.interactive = true;

        this.node.on('pointertap', (e) => {
            e.stopPropagation();
            superApp.app.inStore()
            superApp.emit('SHOW_PACKSHOT', false);
        });
    }
}