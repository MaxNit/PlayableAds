import { Container } from "./Container";
import { DragHolder } from "./DragHolder";
import { Main } from "./Main";
import { TutorHand } from '../../tower/TutorHand';

const configElement = {
    children: {
        holder: {
            type: Container,
            children: {
                dragHolder: { type: DragHolder, id: 'DragHolder' },
                tutorHand: { type: TutorHand, id: 'tutorHand' }
            }
        }
    }
}

export class Camera extends Container {
    constructor(config) {
        super(utils.merge(config, configElement));
        this.holder = this.child('holder');

        this.onResize();
    }

    onResize() {
        this.node.position.set(superApp.app.width / 2, superApp.app.height);
        if (superApp.app.isPortrait) {
            this.node.scale.set(1.04);
        } else {
            this.node.scale.set(0.69);
        }
    }
}