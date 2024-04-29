import { Component } from "../Core/Component";

export class DragComponent extends Component {

    constructor(element) {
        super(element);
        this.isDragging = false;
        this.dragData = null;
        this.dragHolder = null;
        this.firstParent = this.element.parent;
        this.locked = false;
        this.offset = -75;
    }

    onEnable() {
        super.onEnable();
        this.dragHolder = superApp.app.getElementByID('DragHolder');
        this.element.node.interactive = true;
        this.element.collider.node.interactive = true;
        this.setEvents();
    }

    onDisable() {
        super.onDisable();
        this.element.node.interactive = false;
        this.element.collider.node.interactive = false;
    }

    setEvents() {
        this.element.collider.node.on('pointerdown', this.dragStart.bind(this));
        this.element.collider.node.on('pointermove', this.dragMove.bind(this));
        this.element.collider.node.on('pointerup', this.dragEnd.bind(this));
        this.element.collider.node.on('pointerupoutside', this.dragEnd.bind(this));
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.dragEnd();
            }
        });
    }

    dragStart(event) {
        if (this.isDragging || this.locked || this.dragHolder.item) return;
        this.isDragging = true;
        this.dragHolder.item = this.element;

        this.element.changeParent(this.dragHolder);
        this.dragData = event.data;
        const position = this.dragData.getLocalPosition(this.element.node.parent);
        this.element.node.x = position.x;
        this.element.node.y = position.y + this.offset;
        this.element.tweens.scaleTo({ x: 1.15, y: 1.15 }, { time: 150, easing: PIXI.tween.Easing.inOutSine() })
        this.element.emit('DRAG_START');
    }

    dragMove() {
        if (!this.isDragging) return;

        const position = this.dragData.getLocalPosition(this.element.node.parent);
        this.element.node.x = position.x;
        this.element.node.y = position.y + this.offset;
        this.element.emit('DRAG_MOVE');
    }

    async dragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.dragHolder.item = null;
        this.dragData = null;
        this.element.tweens.scaleTo({ x: 1, y: 1 }, { time: 150, easing: PIXI.tween.Easing.inOutSine() })
        this.element.emit('DRAG_END');
    }
}