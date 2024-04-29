import { Container } from "../Core/renderElements/Container";
import { Cell } from "./Cell";

export class Column extends Container {
    constructor(config) {
        super(config);
        this.node.interative = true;
        this.cells = [];
        this.side = config.side;
    }

    spawnCells(config) {
        let y = 0;
        for (let i = 0; i < config.length; i++) {
            const isFirst = i === 0;
            const cellConfig = config[i];
            const cell = new Cell({ cellConfig, column: this, isFirst, side: this.side });
            cell.node.position.y = y;
            this.addChild(cell);
            this.cells.push(cell);
            y += 230;
        }
    }

    checkMannequin() {
        let isCrashed = false;
        const cells = this.getMaxLengthCells();
        cells.forEach(cell => {
            if (cell.isMannequin) {
                const mannequin = cell.mannequin;
                mannequin.addCracks();
                this.isCrashed = true;
                if (mannequin.glass.checkBrake()) superApp.emit('COLLECT_MANNEQUIN', cell);
            }
        })

        return isCrashed;
    }

    getMaxLengthCells() {
        let maxLength;

        if (!superApp.app.isPortrait) {
            maxLength = 3;
        } else {
            if (superApp.app.ratioLess('EMN')) {
                maxLength = 3;
            } else if (superApp.app.ratioLess('MN')) {
                maxLength = 3;
            } else if (superApp.app.ratioLess('XSM')) {
                maxLength = 3;
            } else if (superApp.app.ratioLess('SM')) {
                maxLength = 3;
            } else if (superApp.app.ratioLess('MD')) {
                maxLength = 4;
            } else if (superApp.app.ratioLess('LG')) {
                maxLength = 5;
            } else if (superApp.app.ratioLess('XLG')) {
                maxLength = 5;
            } else {
                maxLength = 5;
            }
        }

        return this.cells.concat().reverse().splice(0, maxLength);
    }
}