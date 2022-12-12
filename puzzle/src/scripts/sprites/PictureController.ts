import { App } from "../..";
import { Item } from "./Item";
import { Panel } from "./Panel";
import { Picture } from "./Picture";
import { SparksFx } from "./Sparks";

export class PictureController {

    private picture: Picture;
    private panel: Panel;
    private countFoundItems: number = 0;

    constructor(picture: Picture, panel: Panel) {
        this.picture = picture;
        this.panel = panel;
        this.init();
    }

    private init(): void {
        this.setEvents();
    }

    private setEvents(): void {
        App.app.stage.on('checkMerge', item => this.checkMerge(item));
    }

    private checkMerge(item: Item): void {
        if (this.picture.checkMerge(item)) {
            this.completeTask(item);
        } else {
            item.returnToStartPosition();
        }
    }

    private completeTask(item: Item): void {
        item.hide();
        this.countFoundItems++;
        this.checkWin();
    }

    private checkWin(): void {
        if (this.countFoundItems === 5) {
            App.app.stage.emit('win');
        }
    }
}
