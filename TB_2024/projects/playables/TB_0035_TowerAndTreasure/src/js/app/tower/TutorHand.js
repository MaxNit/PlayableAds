import { Container } from "../Core/renderElements/Container";
import { Sprite } from "../Core/renderElements/Sprite";

const elementConfig = {
    children: {
        itemHolder: { type: Container, y: 5 },
        fingerHolder: { type: Container, scale: { x: 0.8, y: 0.8 }, children: { finger: { texture: 'finger', anchor: { x: 0.1, y: 0.1 } } } }
    }
}

export class TutorHand extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.fingerHolder = this.child('fingerHolder');
        this.finger = this.fingerHolder.child('finger');
        this.itemHolder = this.child('itemHolder');
        this.tutorItem = null;
        this.finger.node.alpha = 0;
    }

    createTutorItem(from) {
        const item = new Sprite({ texture: from.main.config.texture, alpha: 0.5, pivot: from.main.node.pivot });
        this.tutorItem = item;
        this.itemHolder.addChild(this.tutorItem);
    }

    deleteTutorItem() {
        if (!this.tutorItem) return;

        this.tutorItem.tweens.stop();
        this.itemHolder.node.removeChild(this.tutorItem);
        this.tutorItem.node.destroy();
        this.tutorItem = null;
    }
}