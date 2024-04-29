import { Container } from "../Core/renderElements/Container";
import { Sprite } from "../Core/renderElements/Sprite";
import { DragComponent } from "../components/DragComponent";
import { itemsTextureCenter } from "../const";

const elementConfig = {
    children: { itemHolder: { type: Container, y: 5 }, collider: { texture: 'collider', anchor: { x: 0.5, y: 0.5 } } },
    components: { drag: { type: DragComponent } }
}

export class Item extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.itemID = this.config.itemID;
        this.itemHolder = this.child('itemHolder');
        this.collider = this.child('collider');
        this.dragComponent = this.components.getComponent('drag');
        this.shadow = new Sprite({ texture: `items/${this.itemID}_shadow` });
        this.stroke = new Sprite({ texture: `items/${this.itemID}_stroke` });
        this.main = new Sprite({ texture: `items/${this.itemID}` });
        this.setMainPivot()
        this.init();
        this.setEvents();
    }

    init() {
        this.stroke.hide();
        this.shadow.show();
        this.collider.node.alpha = 0.001;
        this.shadow.node.alpha = 0.4;

        this.itemHolder.addChild(this.shadow);
        this.itemHolder.addChild(this.stroke);
        this.itemHolder.addChild(this.main);
        this.setColliderSize();
    }

    async setColliderSize() {
        await this.tweens.wait(100);
        this.collider.node.width = (this.main.node.width / 2) - 10;
        this.collider.node.height = (this.main.node.height / 2) + 20;
    }

    onLoad() {
        
    }

    setEvents() {
        this.on('DRAG_START', this.onDragStart, this);
        this.on('DRAG_MOVE', this.onDragMove, this);
        this.on('DRAG_END', this.onDragEnd, this);
    }

    setMainPivot() {
        const pivot = itemsTextureCenter[this.itemID] ? itemsTextureCenter[this.itemID] : { x: 0, y: 0 };
        this.main.node.pivot = pivot;
        this.main.node.position = pivot;
        this.collider.node.y = pivot.y;
    }

    async returnToStartPosition() {
        this.dragComponent.disable();
        await this.animateToHolderPosition(this.holder)
        this.dragComponent.enable();
        this.changeParent(this.holder);
        this.node.position.set(0, 0);
        superApp.app.sounds.play('dragEnd', { volume: 0.5 });
    }

    async animateToHolderPosition(holder) {
        const position = this.parent.getLocalPositionFor(holder);
        const time = 200;
        await this.tweens.run(position, { time , easing: PIXI.tween.Easing.inQuad() });
        this.changeParent(holder);
        this.node.position.set(0, 0);
        return this.tweens.wait(0);
    }

    onDragStart() {
        this.node.alpha = 0.8;
        superApp.emit('ITEM_UP', this);
        this.stroke.show();
        this.shadow.hide();
    }

    onDragMove() {
        superApp.emit('ITEM_MOVE', this);
    }

    onDragEnd() {
        this.node.alpha = 1;
        superApp.emit('ITEM_DROP', this);
        this.stroke.hide();
        this.shadow.show();
    }
}