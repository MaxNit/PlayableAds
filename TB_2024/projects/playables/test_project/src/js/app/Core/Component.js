export class Component {
    constructor(element) {
        this.element = element;
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
        this.onEnable();
    }

    disable() {
        this.enabled = false;
        this.onDisable();
    }

    onEnable() { }

    onDisable() { }
}