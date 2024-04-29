import { Sprite } from "./Sprite";

export class InstallButton extends Sprite {
    constructor(config) {
        super(config);

        this.node.interactive = true;
        this.node.on('pointertap', (e) => {
            e.stopPropagation();
            superApp.app.inStore()
        });
        playableEnv.params && playableEnv.params.showInstallButton ? this.show() : this.hide();
        this.onResize();
    }

    onResize() {
        const x = superApp.app.width - 120;
        const y = 110;
        this.node.position.set(x, y);
    }


}