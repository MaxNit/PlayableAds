export class ComponentManager {
    constructor(element) {
        this.element = element;
        this.components = new Map();

        this.parseComponents();
    }

    parseComponents() {
        if (!this.element.config.components) return;

        const componentsConfig = this.element.config.components;
        const keys = Object.keys(componentsConfig);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const componentConfig = componentsConfig[key];
            const component = new componentConfig.type(this.element, componentConfig);
            this.components.set(key, component);
        }
    }

    getComponent(name) {
        return this.components.get(name);
    }
}