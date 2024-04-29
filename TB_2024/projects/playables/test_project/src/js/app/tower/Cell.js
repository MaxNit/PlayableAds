import { Container } from "../Core/renderElements/Container";
import { SpriteFrameAnimation } from "../Core/renderElements/SpriteFrameAnimation";
import { ItemsHolder } from "./ItemsHolder";
import { Mannequin } from "./Mannequin";
import { DevModeBehavior } from '../tools/DevModeBehavior';

const elementConfig = {
    children: {
        sprite: { texture: "cell" },
        itemsHolder: { type: ItemsHolder },
        mannequin: { type: Mannequin },
        glowGreen: { texture: 'cell_glow_green', visible: false },
        glowRed: { texture: 'cell_glow_red', visible: false },
    }
}

export class Cell extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.sprite = this.child('sprite');
        this.mannequin = this.child('mannequin');
        this.itemsHolder = this.child('itemsHolder');
        this.glowGreen = this.child('glowGreen');
        this.glowRed = this.child('glowRed');
        this.column = this.config.column;
        this.isMannequin = config.cellConfig === 'pearls';
        this.side = this.config.side;
        this.isFirst = this.config.isFirst;
        this.goDownPromise = null;

        if (!this.isMannequin) {
            this.itemsHolder.addItemsToHolders(this.config.cellConfig);
            this.mannequin.hide();
        }
        this.checkSide();
    }

    checkSide() {
        if (!this.isFirst) return;

        const texture = this.side === 'left' ? 'cellFirstLeft' : 'cellFirstRight';
        this.sprite.node.texture = utils.getTexture(texture);
        this.sprite.node.y -= 20;
    }

    isFull() {
        if (this.isMannequin) return true;
        let fullnes = true;
        this.itemsHolder.holders.forEach(holder => {
            if (holder.item === null) fullnes = false;
        })
        return fullnes;
    }

    hideGlow() {
        this.glowGreen.hide();
        this.glowRed.hide();
    }

    showGlow(isGreen) {
        const glow = isGreen ? this.glowGreen : this.glowRed;
        glow.show();
    }

    checkFullnes() {
        const holders = this.itemsHolder.holders;
        if (holders.length === 0 || holders.length !== 3) return false;

        const firstItemId = holders[0].item && holders[0].item.itemID;

        for (let i = 1; i < holders.length; i++) {
            if (holders[i].item === null || holders[i].item.itemID !== firstItemId) {
                return false;
            }
        }

        return true;
    }

    async complete() {
        this.itemsHolder.holders.forEach(holder => holder.completeAnimation());
        superApp.app.sounds.play('collect');
        await this.tweens.wait(300);
        return this.downScaleAnimation();
    }

    downScaleAnimation() {
        return this.tweens.scaleTo({ x: 0, y: 0 }, { time: 250, easing: PIXI.tween.Easing.inBack() });
    }

    async goDown() {
        if (this.goDownPromise) {
            await this.goDownPromise;
            superApp.app.sounds.play('boxDrop', { volume: 0.3 });
            await this.tweens.run({ y: this.node.y + 230 }, { time: 500, easing: PIXI.tween.Easing.outBounce() });
            this.goDownPromise = null;
        } else {
            superApp.app.sounds.play('boxDrop', { volume: 0.3 });
            this.goDownPromise = this.tweens.run({ y: this.node.y + 230 }, { time: 500, easing: PIXI.tween.Easing.outBounce() });
            await this.goDownPromise;
            this.goDownPromise = null;
        }
    }

    getItems() {
        return this.itemsHolder.holders.map(holder => holder.item);
    }

    getEmptyHolder() {
        return this.itemsHolder.holders.find(holder => !holder.item);
    }

    getRandomItemID() {
        const holder = this.itemsHolder.holders.find(holder => holder.item);
        return holder.item.itemID;
    }
}