import { CTAButton } from "../CTAButton";
import { Container } from "../Core/renderElements/Container";
import { VERSIONS, VERSION_ID } from "../const";
import { Logo } from "./Logo";
import { PackshotBackground } from "./PackshotBackground";

const elementConfig = {
    children: {
        bg: { type: PackshotBackground, alpha: 0 },
        logoHolder: { type: Container, children: { logo: { type: Logo, scale: { x: 0.8, y: 0.8 } } } },
        letsTryHolder: { type: Container, children: { letsTry: { texture: 'lets_try', visible: false, y: 100 } } },
        ctaButtonHolder: { type: Container, children: { ctaButton: { type: CTAButton, visible: false, y: 400 } } }
    },
    scale: { x: 1.2, y: 1.2 }
}

export class Packshot extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.bg = this.child('bg');
        this.logoHolder = this.child('logoHolder');
        this.letsTryHolder = this.child('letsTryHolder');
        this.ctaButtonHolder = this.child('ctaButtonHolder');
        this.logo = this.logoHolder.child('logo');
        this.letsTry = this.letsTryHolder.child('letsTry');
        this.ctaButton = this.ctaButtonHolder.child('ctaButton');
        this.isShown = false;
        this.hide();
        this.onResize();
    }

    onResize() {
        this.node.position.set(superApp.app.width / 2, superApp.app.height / 2);


        if (superApp.app.isPortrait) {
            this.logoHolder.show();
            this.letsTryHolder.show();
            if (superApp.app.ratioLess('EMN')) {
                this.logoHolder.node.y = 30;
                this.letsTryHolder.node.y = -35;
                this.ctaButtonHolder.node.y = -90;
            } else if (superApp.app.ratioLess('MN')) {
                this.logoHolder.node.y = 30;
                this.letsTryHolder.node.y = -35;
                this.ctaButtonHolder.node.y = -90;
            } else if (superApp.app.ratioLess('XSM')) {
                this.logoHolder.node.y = -20;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -80;
            } else if (superApp.app.ratioLess('SM')) {
                this.logoHolder.node.y = -20;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -40;
            } else if (superApp.app.ratioLess('MD')) {
                this.logoHolder.node.y = -80;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -30;
            } else if (superApp.app.ratioLess('LG')) {
                this.logoHolder.node.y = -80;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -10;
            } else if (superApp.app.ratioLess('XLG')) {
                this.logoHolder.node.y = -80;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -10;
            } else {
                this.logoHolder.node.y = -80;
                this.letsTryHolder.node.y = -45;
                this.ctaButtonHolder.node.y = -10;
            }
        } else {
            this.logoHolder.show();
            this.letsTryHolder.hide();
            this.logoHolder.node.y = 130;
            this.ctaButtonHolder.node.y = -200;
        }
    }

    async showPackshot(isFinishing) {
        if (this.isShown) return;
        this.isShown = true;
        this.bg.tweens.run({ alpha: 1 }, { time: 300 });
        this.show();
        await this.tweens.wait(500);
        if (!superApp.app.isPortrait) this.logo.node.y = -150;
        await this.logo.startAnimation();
        this.logo.lettersAnimation();
        this.tweens.run({ scale: { x: 1, y: 1 } }, { time: 200 });
        this.logo.tweens.scaleTo({ x: 0.9, y: 0.9 }, { time: 200 });
        await this.logo.tweens.run({ x: 0, y: -250 }, { time: 200 });
        superApp.app.sounds.play('whoosh');
        this.ctaButton.node.scale.set(0);
        this.ctaButton.show();
        await this.ctaButton.tweens.scaleTo({ x: 1, y: 1 }, { time: 300, easing: PIXI.tween.Easing.outBack() });
        if (superApp.app.isPortrait) superApp.app.sounds.play('whoosh');
        this.letsTry.node.scale.set(0);
        this.letsTry.show();
        await this.letsTry.tweens.scaleTo({ x: 1, y: 1 }, { time: 300, easing: PIXI.tween.Easing.outBack() });
        if (!window.is_adwords) this.ctaButton.startAnimation();
        if (isFinishing) superApp.app.finish();
        await this.logo.tweens.wait(1500);

        if (VERSIONS.isAutoredirect) {
            superApp.app.inStore();
        }
    }
}