import { Container as PIXIContainer }  from 'pixi.js';
import { App } from '../..';

export class Container extends PIXIContainer {

    public name: string;
    public objectId: string;
    valueScale?: number = 0;

    constructor(config) {
        super();
        this.sortableChildren = true;
        config.name !== undefined ? this.name = config.name : this.name = null;
        if (config.children !== undefined) this.createChildren(config.children);
        if (config.objectId !== undefined) this.objectId = config.objectId;
        if (config.positions !== undefined) this.setPosition(config.positions);
        if (config.positions !== undefined) window.addEventListener('resize', () => this.setPosition(config.positions));
    }

    private setPosition(config): void {
        this.position.set(config[`${App.app.getOrientation()}`].x, config[`${App.app.getOrientation()}`].y);
    }

    private createChildren(children): void {
        children.forEach(configItem => {
            const displayObject = App.app.createChildren(configItem);
            this.addChild(displayObject);
        })
    }

    public getChild(name): any {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === name) return this.children[i];
        }
    }
}