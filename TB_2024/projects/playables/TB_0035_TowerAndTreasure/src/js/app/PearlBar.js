import { Container } from "./Core/renderElements/Container";
import { DevModeBehavior } from "./tools/DevModeBehavior";
import { Digits } from "./tools/Digits";

const elementConfig = {
    x: 150, y: 110,
    children: {
        main: {
            texture: 'pearlBar/bar',
            children: {
                pearl: { texture: 'pearlBar/pearl', x: -80 },
                digits: { type: Digits, atlasName: 'digits', x: 17 }
            }
        }
    }
}

export class PearlBar extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.main = this.child('main');
        this.digits = this.main.child('digits');
        this.pearl = this.main.child('pearl');
        this.value = 0;
    }

    get value() { return this._value };

    set value(value) { 
        this._value = value;
        this.digits.setValue(this.formatValue(this.value));
     }

    addValue(value) {
        const tweenable = { value: this.value };
        this.tweens.animate(tweenable, { value: this.value + value }, {
            time: 300, on: { update: () => this.value = tweenable.value }
        })
    }

    formatValue(value) {
        return Math.ceil(value).toString();
    }

    pearlAnimation() {
        this.pearl.tweens.scaleTo({ x: 1.15, y: 1.15 }, { time: 100, pingPong: true, repeat: 5, delay: 1400 });
        superApp.app.sounds.play('glass');
    }
}