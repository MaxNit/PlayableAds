import { Container } from "../Core/renderElements/Container";
import { Glass } from "./Glass";
import { PearlParticles } from "./PearlParticles";

const elementConfig = {
    children: { 
        mannequin: { texture: 'mannequin', y: 22 },
        glass: { type: Glass, id: 'glass' }
    }
}

export class Mannequin extends Container {

    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.glass = this.child('glass');
        this.mannequin = this.child('mannequin');
    }

    addCracks() {
        this.glass.crack();
    }

    async onBrakeGlass() {
        const pearlParticles = new PearlParticles({});
        this.mannequin.addChild(pearlParticles);
        this.mannequin.node.texture = utils.getTexture('mannequinEmpty');
        await pearlParticles.animate();
        superApp.emit('ADD_VALUE_TO_BAR', 25);
        return this.tweens.wait(0);
    }
}