import { Box } from "../../Box";
import { Container } from "./Container";
import { SpriteFrameAnimation } from "./SpriteFrameAnimation";

const elementConfig = {
    children: { 
        box: { type: Box, id: 'superBox' }
    }
}

export class Main extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));

        const animation = new SpriteFrameAnimation({ textureName: 'blow', count: 17, x: 300, y: 300 });
        animation.node.loop = true;
        this.addChild(animation);
        animation.play();
    }
}