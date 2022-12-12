import { Container } from "../core/Container";
import { Text } from "../core/Text";


export class Title extends Container {

    private whiteText: Text;
    private orangeText: Text;

    constructor(config) {
        super(config);
        this.init();
    }

    private init(): void {
        this.createText();
        this.addChild(this.whiteText, this.orangeText);
    }

    private createText(): void {
        this.whiteText = new Text('CLICK ON', {
            fill: ' #ffffff',
            fontFamily: 'stavki',
            fontSize: 60,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        this.whiteText.position.set(-130, -30);

        this.orangeText = new Text('              THE CHEST \nAND GET BONUSES', {
            fill: ' #fff700',
            fontFamily: 'stavki',
            fontSize: 60,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 3,
        });
        this.orangeText.position.set(0, 0);
    }
}