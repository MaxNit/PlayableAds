import gsap from "gsap";
import { App } from "../..";
import { Sprite } from "../core/Sprite";

export class Item extends Sprite {

    private isDrag: boolean = false;
    private eventData: any;
    private startPosition: { x: number, y: number };

    constructor(config) {
        config.texture = App.app.getTexture(config.image);
        super(config);
        this.init();
    }

    private init(): void {
        this.startPosition = { x: this.x, y: this.y };
        this.makeDraggable();
    }

    private makeDraggable(): void {
        this.interactive = true;
        this
            .on('pointerdown', event => this.onDragStart(event))
            .on('pointermove', () => this.onDragMove())
            .on('pointerup', () => this.onDragEnd())
    }

    private onDragStart(event): void {
        if (this.isDrag) return;
        this.isDrag = true;
        this.eventData = event.data;
    }

    private onDragMove(): void {
        if (!this.isDrag) return;

        const position = this.eventData.getLocalPosition(this.parent);
        this.position.set(position.x, position.y);
    }

    private onDragEnd(): void {
        if (!this.isDrag) return;
        this.isDrag = false;
        
        App.app.stage.emit('checkMerge', this);
    }

    public returnToStartPosition() {
        gsap.to(this, { x: this.startPosition.x, y: this.startPosition.y, duration: 1 });
    }

    public complete(): void {
        this.hide();
    }
}