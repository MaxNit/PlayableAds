import { Item } from "./Item";

export class ItemsFactory {

    static generateConfig(towerConfig) {
        const config = {
            leftColumn: [],
            rightColumn: []
        }

        for (let i = 0; i < towerConfig.length; i++) {
            const leftColumnConfig = ItemsFactory.geItemsByConfig(towerConfig[i].left);
            const rightColumnConfig = ItemsFactory.geItemsByConfig(towerConfig[i].right);
            config.leftColumn.push(leftColumnConfig);
            config.rightColumn.push(rightColumnConfig);
        }

        return config;
    }


    static geItemsByConfig(config) {
        if (config === 'pearls') return config;

        const items = [];
        for (let i = 0; i < config.length; i++) {
            const itemID = config[i];
            const item = itemID === null ? null : new Item({ itemID });
            items.push(item);
        }

        return items;
    }

}