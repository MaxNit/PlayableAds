
export class TweenManager {
    constructor(element) {
        this.element = element;
        this.tweenManager = PIXI.tweenManager;
    }

    run(to, options) {
        const tween = this.tweenManager.createTween(this.element.node, options);
        tween.to(to);
        return tween.startPromise();
    }

    scaleTo(scale, options) {
        const tween = this.tweenManager.createTween(this.element.node, options);
        tween.to({ scale: { x: scale.x, y: scale.y } });
        return tween.startPromise();
    }

    wait(time) {
        const tween = this.tweenManager.createTween(this.element.node, { time });
        tween.to({});
        return tween.startPromise();
    }

    animate(tweenable, to, options) {
        const tween = this.tweenManager.createTween(tweenable, options);
        tween.to(to);
        return tween.startPromise();
    }

    stop() {
        const tweens = this.tweenManager.getTweensForTarget(this.element.node);
        tweens.forEach(tween => {
            tween.stop();
            tween.remove();
            this.tweenManager.removeTween(tween);
        });
    }

}