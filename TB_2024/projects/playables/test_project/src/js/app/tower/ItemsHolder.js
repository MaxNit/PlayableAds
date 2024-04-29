import { Container } from "../Core/renderElements/Container";
import { ItemHolder } from "./ItemHolder";

const elementConfig = {
    children: {
        left: { type: ItemHolder, x: -85 },
        center: { type: ItemHolder },
        right: { type: ItemHolder, x: 85 },
    }
}

export class ItemsHolder extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.left = this.child('left');
        this.center = this.child('center');
        this.right = this.child('right');
        this.holders = [this.left, this.center, this.right];
    }

    addItemsToHolders(items) {
        this.holders.forEach((holder, index) => {
            const item = items[index];
            if (item) {
                holder.addChild(items[index]);
                holder.item = item;
                item.holder = holder;
            }
        });
    }

    disableItems() {
        this.holders.forEach(holder => holder.item && holder.item.dragComponent.disable());
    }

    enableItems() {
        this.holders.forEach(holder => holder.item && holder.item.dragComponent.enable());
    }
}