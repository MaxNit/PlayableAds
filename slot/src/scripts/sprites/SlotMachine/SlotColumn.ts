import gsap from "gsap";
import { App } from "../../..";
import { Container } from "../../core/Container";
import { Sprite } from "../../core/Sprite";
import { Utils } from "../../core/utils";

const itemsTextures = ['10', 'A', 'bird', 'book', 'J', 'K', 'man', 'Q', 'ra', 'wolf'];

export class SlotColumn extends Container {

    private items: Sprite[] = [];
    private moveTween: any;

    constructor(config) {
        super(config);
        this.create();
    }

    private create(): void {
        let y = 0;
        for (let i = 0; i < 30; i++) {
            const textureName = itemsTextures[Utils.getRandomValue(0, itemsTextures.length)]
            const texture = App.app.getTexture(textureName);
            const item = new Sprite({ name: textureName, texture });
            item.position.set(0, y);
            this.addChild(item);
            this.items.push(item);
            y += 130;
        }
        this.pivot = { x: 10, y: this.height / 2 };
    }

    public start(resultItem: string): void {
        this.moveTween = gsap.timeline({})
            .to(this, { y: 500, duration: .2, repeat: 10, ease: 'none' })
            .to(this, {
                y: 0, duration: 1, ease: 'Back.easeOut', onStart: () => {
                    this.items[15].texture = App.app.getTexture(resultItem);
                }
            })

    }

    public stop(): void {
        // thi
    }
}