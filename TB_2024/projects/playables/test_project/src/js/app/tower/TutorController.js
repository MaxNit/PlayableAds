import { Container } from "../Core/renderElements/Container";

export class TutorController {

    constructor(tutorHand, tower) {
        this.hand = tutorHand;
        this.tower = tower;
        this.locked = true;
        this.tutorCells = null;
        this.waitObject = new Container({});
        this.isStarted = false;
    }

    getTutorCells() {
        const mergedArray = [];
        const left = this.tower.leftColumn.cells.concat().reverse();
        const right = this.tower.rightColumn.cells.concat().reverse();
        const maxLength = Math.max(left.length, right.length);

        for (let i = 0; i < maxLength; i++) {
            if (i < left.length) {
                mergedArray.push(left[i]);
            }
            if (i < right.length) {
                mergedArray.push(right[i]);
            }
        }
        const lessThan = superApp.app.isPortrait ? 8 : 6;
        return mergedArray.filter((cell, index) => index < lessThan);
    }

    async start(delay = 2000) {
        if (this.locked || this.isStarted) return;
        this.isStarted = true;
        await this.waitObject.tweens.wait(delay);
        this.tutorCells = this.getTutorCells();
        const tutorObjects = this.getTutorObjects(this.tutorCells);
        if (!tutorObjects.from || !tutorObjects.to) return;
        this.animation(tutorObjects.from, tutorObjects.to);
    }

    stop() {
        this.isStarted = false;
        this.waitObject.tweens.stop();
        this.hand.tweens.stop();
        this.hand.finger.tweens.stop();
        this.hand.deleteTutorItem();
        this.hand.finger.node.alpha = 0;
        this.hand.node.position.set(0, 0);
        this.tutorCells = null;
    }

    destroy() {
        this.stop();
        this.locked = true;
        this.hand.hide();
    }

    async animation(from, to) {
        this.hand.finger.node.alpha = 0;
        this.hand.finger.node.position.set(0, 0);
        this.hand.finger.node.scale.set(1);
        const localPosition1 = this.hand.getLocalPositionFor(from.parent);
        const localPosition2 = this.hand.getLocalPositionFor(to);
        const firstPostion = { x: localPosition1.x, y: localPosition1.y + from.main.node.pivot.y };
        const secondPosition = { x: localPosition2.x, y: localPosition2.y + from.main.node.pivot.y };
        this.hand.node.position.set(firstPostion.x + 50, firstPostion.y + 30);
        this.hand.createTutorItem(from);
        this.hand.tutorItem.hide();
        this.hand.finger.tweens.run({ alpha: 1 }, { time: 150 });
        await this.hand.tweens.run({ x: firstPostion.x, y: firstPostion.y }, { time: 200, easing: PIXI.tween.Easing.inOutSine() });
        this.hand.tutorItem.show();
        this.hand.finger.tweens.run({ angle: -5 }, { time: 250, easing: PIXI.tween.Easing.inOutSine() });
        await this.hand.finger.tweens.scaleTo({ x: 0.85, y: 0.85 }, { time: 250, easing: PIXI.tween.Easing.inOutSine() });
        await this.hand.tweens.run({ x: secondPosition.x, y: secondPosition.y }, { time: 500, easing: PIXI.tween.Easing.inOutSine() });
        this.hand.finger.tweens.run({ angle: 0 }, { time: 250, easing: PIXI.tween.Easing.inOutSine() });
        await this.hand.finger.tweens.scaleTo({ x: 1, y: 1 }, { time: 250, easing: PIXI.tween.Easing.inOutSine() });
        this.hand.finger.tweens.run({ alpha: 0 }, { time: 150 });
        this.hand.tutorItem.tweens.run({ alpha: 0 }, { time: 150 });
        await this.hand.finger.tweens.run({ x: 50, y: 30 }, { time: 200, easing: PIXI.tween.Easing.inOutSine() });
        this.hand.finger.node.position.set(0);
        this.hand.deleteTutorItem();
        await this.hand.tweens.wait(2000);
        this.hand.node.position.set(0, 0);
        this.animation(from, to);
    }

    getTutorObjects(arr) {
        const arrCells = arr.map(cell => ({ cell, items: cell.getItems() }));
        let tutorCell = null;
        let tutorItem = null;

        for (let j = 0; j < arrCells.length; j++) {
            const config = arrCells[j];
            let isNull = false;
            let firstItem = null;
            let isTheSame = false;
            for (let i = 0; i < config.items.length; i++) {
                const item = config.items[i];
                if (item === null) {
                    isNull = true;
                }
                if (item && !firstItem) {
                    firstItem = item;
                }
                if (item && firstItem && firstItem !== item && item.itemID === firstItem.itemID) {
                    isTheSame = true;
                }
            }
            if (isNull && isTheSame) {
                tutorCell = config.cell;
                break;
            }
        }

        if (tutorCell) {
            let itemID;
            tutorCell.getItems().forEach(item => {
                if (item) itemID = item.itemID;
            });

            for (let i = 0; i < arrCells.length; i++) {
                const config = arrCells[i];
                for (let j = 0; j < config.items.length; j++) {
                    const item = config.items[j];
                    if (item && config.cell !== tutorCell && item.itemID === itemID) {
                        tutorItem = item;
                        break;
                    }
                }
                if (tutorItem) break;
            }
        }

        if (tutorItem) {
            const emptyHolder = tutorCell.itemsHolder.holders.find(holder => !holder.item);
            return { from: tutorItem, to: emptyHolder };
        }

        arrCells.forEach(config => {
            let isFirstNull = false;
            let isSecondNull = false;
            let findItem = null;
            config.items.forEach(item => {
                if (item) findItem = item;
                if (!item && !isFirstNull) {
                    isFirstNull = true;
                } else if (!item && isFirstNull) {
                    isSecondNull = true;
                }
            });
            if (isFirstNull && isSecondNull && findItem) {
                tutorCell = config.cell;
            }
        });

        if (tutorCell) {
            let secondItem;
            arrCells.forEach(config => {
                config.items.forEach(item => {
                    if (item && config.cell !== tutorCell && tutorCell.getRandomItemID() === item.itemID) {
                        secondItem = item;
                    }
                });
            });
            if (secondItem) {
                return { from: secondItem, to: tutorCell.getEmptyHolder() };
            }
        }

        let first = null;
        let second = null;

        for (let i = 0; i < arrCells.length; i++) {
            const config = arrCells[i];

            if (!second) {
                const emptyHolder = config.cell.getEmptyHolder();
                if (emptyHolder) {
                    second = emptyHolder;
                    continue;
                }
            }

            for (let j = 0; j < config.items.length; j++) {
                const item = config.items[j];
                if (item) {
                    first = item;
                    if (first && second) return { from: first, to: second };
                }
            }
        }
    }
}