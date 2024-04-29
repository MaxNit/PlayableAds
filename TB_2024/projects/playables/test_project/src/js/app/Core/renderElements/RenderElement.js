import { ComponentManager } from "../ComponentManager";
import { TweenManager } from "../TweenManager";

export class RenderElement extends PIXI.utils.EventEmitter {

    constructor(config) {
        super(config);
        this.config = config;
        this.node = this.createNode();
        this.key = config.key;
        this.children = new Map();
        this.parent = null;
        this.tweens = new TweenManager(this);
        this.components = new ComponentManager(this);

        this.createChildren();
        this.setAttributes();
        superApp.on('onLoad', this.onLoad, this);
    }

    onLoad() {
        
    }

    child(key) {
        return this.children.get(key);
    }

    addChild(child) {
        this.node.addChild(child.node);
        child.parent = this;
    }

    createNode() {
        return null;
    }

    onResize() {

    }

    createChildren() {
        if (!this.config.children) return;

        const keys = Object.keys(this.config.children);
        keys.forEach(key => {
            const config = this.config.children[key];
            config.key = key;
            const child = superApp.app.createRenderElement(this.config.children[key]);
            this.addChild(child);
            child.parent = this;
            this.children.set(key, child);
        })
    }

    setAttributes() {
        this.node.x = this.config.x !== undefined ? this.config.x : 0;
        this.node.y = this.config.y !== undefined ? this.config.y : 0;
        this.node.angle = this.config.angle !== undefined ? this.config.angle : 0;
        this.node.anchor = this.config.anchor !== undefined ? this.config.anchor : { x: 0.5, y: 0.5 };
        this.node.pivot = this.config.pivot !== undefined ? this.config.pivot : { x: 0, y: 0 };
        this.node.alpha = this.config.alpha !== undefined ? this.config.alpha : 1;
        this.node.scale = this.config.scale !== undefined ?
            !isNaN(this.config.scale) ? { x: this.config.scale, y: this.config.scale } : this.config.scale
            : { x: 1, y: 1 };
        if (this.config.visible !== undefined) this.node.visible = this.config.visible;
    }

    hide() {
        this.node.visible = false;
    }

    show() {
        this.node.visible = true;
    }

    changeParent(newParent) {
        const globalPosition = this.node.getGlobalPosition();
        const newLocalPosition = newParent.node.toLocal(globalPosition);
        this.node.parent.removeChild(this.node);
        newParent.addChild(this);

        this.node.position.set(newLocalPosition.x, newLocalPosition.y);
    }

    getLocalPositionFor(element) {
        const containerGlobalPosition = element.node.toGlobal(new PIXI.Point(0, 0));
        const positionRelativeToSprite = this.node.toLocal(containerGlobalPosition);
        return positionRelativeToSprite;
    }

    checkCollision(object2) {
        const object1Bounds = this.node.getBounds();
        const object2Bounds = object2.node.getBounds();

        return (
            object1Bounds.x + object1Bounds.width > object2Bounds.x &&
            object1Bounds.x < object2Bounds.x + object2Bounds.width &&
            object1Bounds.y + object1Bounds.height > object2Bounds.y &&
            object1Bounds.y < object2Bounds.y + object2Bounds.height
        );
    }
}