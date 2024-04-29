import { VERSIONS, VERSION_ID } from "./const";
import { TowerController } from "./tower/TowerController";

export class GameController {
    
    constructor() {
        this.camera = superApp.app.getElementByID('camera');
        this.tower = superApp.app.getElementByID('tower');
        this.pearlBar = superApp.app.getElementByID('pearlBar');
        this.packshot = superApp.app.getElementByID('packshot');
        this.tower = superApp.app.getElementByID('tower');
        this.scene = superApp.app.getElementByID('scene');
        this.redirectContainer = superApp.app.getElementByID('redirectContainer');
        this.towerController = new TowerController(this.tower);
        
        this.init();
        this.setEvents();
    }

    async init() {
        await this.startCameraAnimation();
        this.tower.enableItems();
        this.towerController.tutorController.locked = false;
        this.towerController.tutorController.start(1000);
    }

    setEvents() {
        superApp.on('SHOW_PACKSHOT', () => this.showPackshot(false));
        superApp.on('ADD_VALUE_TO_BAR', value => this.pearlBar.addValue(value));
        superApp.on('GAME_COMPLETE', (isGlassAnimation) => this.gameComplete(isGlassAnimation));
    }

    async startCameraAnimation() {
        this.tower.node.position.y = (-superApp.app.origHeight / 2) / this.camera.node.scale.x;
        this.camera.holder.node.scale.set(0.9);
        await this.camera.tweens.wait(300);
        await this.tower.tweens.run({ y: -this.tower.node.height + 345 }, { easing: PIXI.tween.Easing.inOutCubic(), time: 4000 });
        return this.camera.holder.tweens.scaleTo({ x: 1, y: 1 }, { time: 700, easing: PIXI.tween.Easing.outBack() });
    }

    async gameComplete(isGlassAnimation) {
        if (VERSIONS.isMisclick) {
            this.redirectContainer.enable();
            return;
        }

        const delay = isGlassAnimation ? 1500 : 0;
        await this.camera.tweens.wait(delay);
        const delay2 = isGlassAnimation ? 2000 : 0;
        await this.camera.tweens.wait(delay2);
        this.showPackshot(true);
        superApp.app.sounds.play('win');
    }

    showPackshot(isFinishing) {
        superApp.app.sounds.stop('music');
        this.tower.disableItems();
        this.scene.blurIn();
        this.towerController.tutorController.destroy();
        this.packshot.showPackshot(isFinishing);
    }

}