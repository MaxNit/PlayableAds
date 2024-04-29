import { Container } from "./Container";

export class DragHolder extends Container {
    constructor(config) {
        super(config);
        this.item = null;
    }
}