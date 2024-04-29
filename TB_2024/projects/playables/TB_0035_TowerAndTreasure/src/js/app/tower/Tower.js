import { Chest } from "../Chest";
import { Container } from "../Core/renderElements/Container";
import { TowerConfig } from "../const";
import { Column } from "./Column";
import { ItemsFactory } from "./ItemsFactory";

const elementConfig = {
    children: {
        leftColumn: { type: Column, id: 'leftColumn', x: -150, side: 'left'},
        rightColumn: { type: Column, id: 'rightColumn', x: 150, side: 'right' },
        chest: { type: Chest, y: -320 }
    },
    pivot: { x: 0, y: -350 }
}

export class Tower extends Container {
    constructor(config) {
        super(utils.merge(elementConfig, config));
        this.leftColumn = this.child('leftColumn');
        this.rightColumn = this.child('rightColumn');
        this.chest = this.child('chest');

        this.generateTower();
        this.cells = this.mergeArrays(this.leftColumn.cells, this.rightColumn.cells);
        this.onResize();
    }

    generateTower() {
        const config = TowerConfig;
        const generatedConfig = ItemsFactory.generateConfig(config);
    
        this.leftColumn.spawnCells(generatedConfig.leftColumn);
        this.rightColumn.spawnCells(generatedConfig.rightColumn);
    }

    mergeArrays(array1, array2) {
        const mergedArray = [];
        const maxLength = Math.max(array1.length, array2.length);

        for (let i = 0; i < maxLength; i++) {
            if (i < array1.length) {
                mergedArray.push(array1[i]);
            }
            if (i < array2.length) {
                mergedArray.push(array2[i]);
            }
        }
    
        return mergedArray;
    }

    updateCells() {
        this.cells = this.mergeArrays(this.leftColumn.cells, this.rightColumn.cells);
    }

    enableItems() {
        this.cells.forEach(cell => cell.itemsHolder.enableItems());
    }

    disableItems() {
        this.cells.forEach(cell => cell.itemsHolder.disableItems());
    }
}