import { Tower } from "../../tower/Tower";
import { TowerController } from "../../tower/TowerController";
import { Container } from "./Container";

const elementConfig = {
    children: { 
        tower: { type: Tower, id: 'tower' }
    }
}

export class Main extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        
        superApp.on('SHAKE', () => this.shake());
    }

    async shake() {
        const y = this.node.y;
        await this.tweens.run({ y: this.node.y + 10 }, { time: 75, pingPong: true, repeat: 6 });
        this.tweens.run({ y }, { time: 75 })
    }
}