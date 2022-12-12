import { timingSafeEqual } from "crypto";
import { App } from "../..";
import { Sprite } from "../core/Sprite";
import { Item } from "./Item";
import gsap from "gsap";
import { SparksFx } from "./Sparks";

export class Picture extends Sprite {

    private taskItems: Sprite[] = [
        this.getChild('cat'),
        this.getChild('grass'),
        this.getChild('towel'),
        this.getChild('mirror'),
        this.getChild('shelf'),
    ]

    constructor(config) {
        config.texture = App.app.getTexture('picture');
        super(config);
        this.init();
    }

    private init(): void {
        this.scale.set(.6, .6);
        console.log(this);
    }

    public checkMerge(item: Item): boolean {
        let isMerge = false;
        this.taskItems.forEach(task => {
            if (item.checkCollision(task) && task.name === item.name) {
                gsap.to(task, { alpha: 1, duration: 0.4 });
                this.addFx(task.position);
                isMerge = true;
            }
        })
        return isMerge;
    }

    private addFx(position: { x: number, y: number }): void {
        const fx = new SparksFx({});
        this.addChild(fx);
        fx.position.set(position.x, position.y);
        fx.start();
    }
}