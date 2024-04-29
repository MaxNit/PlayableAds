import { Container } from '../Core/renderElements/Container';
import { Sprite } from '../Core/renderElements/Sprite';

const symbolMap = {
    ':': 'colon'
};

export class Digits extends Container {

    constructor(config) {
        super(config);
        this.atlasName = config.atlasName || null;
        this.letterSpacing = config.letterSpacing !== undefined ? config.letterSpacing : 0;
        this.spacing += this.letterSpacing;
        this.value = config.value || '0'
        this.symbols = [];

        this.updateText();
    }

     updateText() {
        const splitString = this.value.split('');
        let x = 0;

        for (let i = 0; i < splitString.length; i++) {
            const digitString = splitString[i];

            if (digitString === ' ') {
                x += this.spacing;
                continue;
            }

            const digitSprite = this.getDigitSpriteByString(digitString);
            digitSprite.node.x = x;
            x += digitSprite.node.width;
            this.addChild(digitSprite);
            this.symbols.push(digitSprite);
        }

        this.node.pivot = { x: this.node.width / 2, y: this.node.height / 2 };
    }

     getDigitSpriteByString(string) {
        if (!isNaN(Number(string))) {
            return new Sprite({ texture: `${ this.atlasName }/${ string }`, anchor: { x: 0, y: 0 } });
        } else {
            const digitMap = symbolMap[string];
            return new Sprite({ texture: `${ this.atlasName }/${ digitMap }`, anchor: { x: 0, y: 0 } });
        }
    }

     removeAllDigits() {
        this.symbols.forEach(symbol => {
            this.node.removeChild(symbol.node);
            symbol.node.destroy();
        });
        this.symbols = [];
    }

     setValue(value) {
        this.value = value;
        this.removeAllDigits();
        this.updateText();
    }
}