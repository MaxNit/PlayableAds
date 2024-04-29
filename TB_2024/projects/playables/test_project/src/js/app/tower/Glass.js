import { Container } from "../Core/renderElements/Container";
import { MAX_NUMBER_GLASS_HIT } from "../const";

const elementConfig = {
    children: {
        windowHolder: {
            type: Container,
            children: {
                splinter_0: { texture: 'glass/splinter_0', "x": -10, "y": 60, "pivot": { "x": -10, "y": 60 } },
                splinter_1: { texture: 'glass/splinter_1', "x": 100, "y": 50, "pivot": { "x": 100, "y": 50 } },
                splinter_2: { texture: 'glass/splinter_2', "x": -90, "y": -60, "pivot": { "x": -90, "y": -60 } },
                splinter_3: { texture: 'glass/splinter_3', "x": -110, "y": 40, "pivot": { "x": -110, "y": 40 } },
                splinter_4: { texture: 'glass/splinter_4', "x": 60, "y": -60, "pivot": { "x": 60, "y": -60 } }
            }
        },
        crackHolder: {
            type: Container,
            children: {
                crack_0: { texture: 'glass/crack_0' },
                crack_1: { texture: 'glass/crack_1' },
                crack_2: { texture: 'glass/crack_2' },
            }
        }
    }
}

export class Glass extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.windowHolder = this.child('windowHolder');
        this.crackHolder = this.child('crackHolder');
        this.mannequin = null;
        this.cracks = this.addCracks();
        this.splinters = this.addSplinters();
        this.numberCracks = 0;
        this.isCrushed = false;

        this.cracks.forEach(crack => crack.node.alpha = 0);
    }

    addCracks() {
        const cracks = [];
        this.crackHolder.children.forEach(crack => cracks.push(crack));
        return cracks;
    }

    addSplinters() {
        const splintes = [];
        this.windowHolder.children.forEach(splinter => splintes.push(splinter));
        return splintes;
    }

    crack() {
        if (this.numberCracks === 3) return;
        this.cracks[this.numberCracks].tweens.run({ alpha: 1 }, { time: 250 });
        this.numberCracks++;
    }

    checkBrake() {
        if (this.isCrushed) return;

        if (this.numberCracks === MAX_NUMBER_GLASS_HIT) {
            this.isCrushed = true;
            this.brakeAnimation();
            this.cracks.forEach(crack => crack.hide());
            return true;
        }

        return false;
    }

    brakeAnimation() {
        const ui = superApp.app.getElementByID('ui');
        superApp.app.sounds.play('glass');
        this.splinters.forEach((splinter, index) => {
            splinter.changeParent(ui);
            const time = utils.getRandomNumber(700, 800);
            const neg = index % 2 === 0 ? -1 : 1;
            const angle = utils.getRandomNumber(360, 720) * neg;
            const offsetX = utils.getRandomNumber(300, 400) * neg;
            const x = splinter.node.x + offsetX;
            const y = splinter.node.y + 1500;
            const delay = 20 * index;

            splinter.tweens.run({ x }, { time, easing: PIXI.tween.Easing.inCubic() });
            splinter.tweens.run({ y }, { time, easing: PIXI.tween.Easing.inBack(1), delay });
            splinter.tweens.run({ angle }, { time, easing: PIXI.tween.Easing.inCubic(), delay });
        })
    }
}