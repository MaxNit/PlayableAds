import { MAX_NUMBER_MERGE, MAX_NUMBER_MERGE_MISCLICK, TUTOR_DELAY, VERSIONS } from "../const";
import { TutorController } from "./TutorController";

export class TowerController {
    constructor(tower) {
        this.tower = tower;
        this.hitCell = null;
        this.glass = superApp.app.getElementByID('glass');
        this.tutorHand = superApp.app.getElementByID('tutorHand');
        this.tutorController = new TutorController(this.tutorHand, this.tower);
        this.numberMerges = 0;
        this.isGlassAnimation = false;

        this.setEvents();
    }


    setEvents() {
        superApp.on('ITEM_UP', item => this.onItemUp(item));
        superApp.on('ITEM_MOVE', item => this.onItemMove(item));
        superApp.on('ITEM_DROP', item => this.onItemDrop(item));
        superApp.on('CELL_FULL', cell => this.onCellFull(cell));
        superApp.on('TUTOR_START', () => this.tutorController.start());
        superApp.on('TUTOR_STOP', () => this.tutorController.stop());
        superApp.on('COLLECT_MANNEQUIN', cell => this.collectMannequin(cell));
    }

    onItemUp(item) {
        this.tutorController.stop();
        superApp.app.sounds.play('dragStart');
    }

    onItemMove(item) {
        const cells = []
        for (let i = 0; i < this.tower.cells.length; i++) {
            const cell = this.tower.cells[i];
            cell.hideGlow();
            if (cell.checkCollision(item.collider)) {
                cells.push(cell);                
            }
        }

        this.hitCell = item.findClosestContainer(cells);
        if (!this.hitCell) return;

        const isFull = this.hitCell.isFull();
        isFull ? this.hitCell.showGlow(false) : this.hitCell.showGlow(true);
    }

    async onItemDrop(item) {
        if (!this.hitCell) {
            item.returnToStartPosition();
            return;
        }

        item.dragComponent.disable();
        this.hitCell.hideGlow();
        const holders = this.hitCell.itemsHolder.holders;

        for (let i = 0; i < holders.length; i++) {
            const holder = holders[i];
            if (item.collider.checkCollision(holder) && !holder.item && !this.hitCell.isMannequin) {
                this.placeItemToHolder(item, holder);
                return;
            }
        }

        for (let i = 0; i < holders.length; i++) {
            const holder = holders[i];
            if (!holder.item && !this.hitCell.isMannequin) {
                this.placeItemToHolder(item, holder);
                return;
            }
        }

        item.returnToStartPosition();
        this.tutorController.start(TUTOR_DELAY);
    }

    async placeItemToHolder(item, holder) {
        await item.animateToHolderPosition(holder);
        superApp.app.sounds.play('dragEnd');
        holder.item = item;
        item.holder.item = null;
        item.holder = holder;
        if (this.hitCell.checkFullnes()) {
            this.onCellFull(this.hitCell)
        } else {
            this.tutorController.start(TUTOR_DELAY);
            item.dragComponent.enable();
        } 
        this.hitCell = null;
    }

    async onCellFull(cell) {
        this.numberMerges++;
        cell.complete();
        await cell.tweens.wait(400);
        const columnCells = cell.column.cells;
        const index = columnCells.indexOf(cell);
        const cellsBefore = columnCells.slice(0, index);
        superApp.emit('SHAKE');
        cellsBefore.forEach(cell => cell.goDown());
        columnCells.splice(index, 1);
        this.tower.updateCells();
        await cell.tweens.wait(150);
        if (!cell.column.checkMannequin()) this.tutorController.start(TUTOR_DELAY);
        if (this.numberMerges === MAX_NUMBER_MERGE_MISCLICK && VERSIONS.isMisclick) superApp.emit('GAME_COMPLETE', this.isGlassAnimation);
        if (this.numberMerges === MAX_NUMBER_MERGE) superApp.emit('GAME_COMPLETE', this.isGlassAnimation);
    }

    async collectMannequin(cell) {
        this.isGlassAnimation = true;
        const mannequin = cell.mannequin;
        mannequin.onBrakeGlass();
        await cell.tweens.wait(700);
        cell.downScaleAnimation()
        await cell.tweens.wait(400);
        const columnCells = cell.column.cells;
        const index = columnCells.indexOf(cell);
        const cellsBefore = columnCells.slice(0, index);
        cellsBefore.forEach(cell => cell.goDown());
        columnCells.splice(index, 1);
        this.tower.updateCells();
        this.tutorController.start(TUTOR_DELAY);
        mannequin.tweens.wait(1000);
        this.isGlassAnimation = false;
    }
}