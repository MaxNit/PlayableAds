import gsap from "gsap";
import { Sprite } from "../core/Sprite";
import { Text } from "../core/Text";


export class Panel extends Sprite {

    private text: Text;
    private value: number = 0;

    constructor(config) {
        super(config);
        this.setText();
    }

    private setText(): void {
        this.text = new Text(this.value, {
            fontFamily: 'spin',
            fill: 0xe6c329,
            fontSize: 80
        })
        this.addChild(this.text);
    }

    public updateAmount(delta: number): void {
        this.value += delta;
        this.text.text = this.value;
        gsap.to(this.text.scale, { x: 1.2, y: 1.2, duration: .3, yoyo: true, repeat: 1 })
    }
}