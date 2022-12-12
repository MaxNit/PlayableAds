import { App } from "../..";
import { Sprite } from "../core/Sprite";
import { Text } from '../core/Text';
import gsap from "gsap";


export class Balance extends Sprite {

    private textBalance: Text;
    private textValue: Text;
    public value: number = 0;

    constructor(config) {
        super(config);
        this.setTextBalance();
        this.setTextValue();
        this.setEvents();
    }

    private setEvents(): void {
        App.app.stage.on('addBonus', (positions, value) => this.plusValue(value));
    }

    private setTextBalance(): void {
        this.textBalance = new Text('BALANCE: ', {
            fill: ' #ffffff',
            align: "right",
            fontFamily: 'stavki',
            fontSize: 40,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        this.textBalance.position.set(-60, 3);
        this.addChild(this.textBalance);
    }

    private setTextValue(): void {
        this.textValue = new Text('0£', {
            align: "right",
            fill: ' #fff700',
            fontFamily: 'stavki',
            fontSize: 40,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        this.textValue.position.set(50, 3);
        this.addChild(this.textValue);
    }

    public plusValue(value: number): void {
        this.value += value;
        this.textValue.text = this.value + '£';

        gsap.timeline()
            .to(this.textValue.scale, { x: 1.2, y: 1.2, duration: .3 })
            .to(this.textValue.scale, { x: 1, y: 1, duration: .3 })
    }
}