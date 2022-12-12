import gsap from "gsap";
import { Graphics } from "pixi.js";
import { App } from "../../..";
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { SlotColumn } from "./SlotColumn";


export class SlotMachine extends Sprite {

    private columnsContainer = new Container({});
    private columns: SlotColumn[] = [];

    constructor(config) {
        super(config);
        this.addChild(this.columnsContainer);
        this.init();
    }

    private init(): void {
        this.addMask();
        this.createColumns();
    }

    private createColumns(): void {
        let x = -258;
        for (let i = 0; i < 5; i++) {
            this.columns.push(this.getNewColumn({ x, y: 0 }));
            x += 128;
        }
    }

    private getNewColumn(position): SlotColumn {
        const column = new SlotColumn({});
        column.position.set(position.x, position.y);
        this.columnsContainer.addChild(column);
        return column;
    }

    private addMask(): void {
        const mask = new Graphics();
        mask.beginFill(0xff0000);
        mask.drawRect(0, 0, this.width, this.height - 85);
        mask.endFill();
        mask.position.set(-mask.width / 2, -mask.height / 2 + 1);
        this.columnsContainer.mask = mask;
        this.columnsContainer.addChild(mask);
    }

    public start(resultItem: string): void {
        let delay = 0.1;

        this.columns.forEach(column => {
            gsap.delayedCall(delay, () => column.start(resultItem));
            delay += 0.1;
        })
    }
}