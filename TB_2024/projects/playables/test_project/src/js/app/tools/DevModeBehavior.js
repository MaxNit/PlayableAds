import { Sprite } from "../Core/renderElements/Sprite";

export class DevModeBehavior {

    constructor(target) {
        this.target = target;
        this.isDrag = false;
        this.data = null;
        this.target.node.interactive = true;
        this.devLines = new Sprite({ texture: 'devPivot' });
        this.devLines.node.interactive = true;
        this.devLines.node.anchor.set(0, 1);
        this.devLines.config.anchor = { x: 0, y: 1 };
        this.target.addChild(this.devLines);
        this.init();
    }

    init() {
        this.addDevPositionBehavior();
        this.addDevAngleBehavior();
    }

    setDragEvents() {
        window.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'Enter':
                        this.logProps();
                        break;
                    case 'w':
                        this.target.node.y -= 10;
                        break;
                    case 'a':
                        this.target.node.x -= 10;
                        break;
                    case 's':
                        this.target.node.y += 10;
                        break;
                    case 'd':
                        this.target.node.x += 10;
                        break;
                    case 'ArrowLeft':
                        if (event.shiftKey) return;
                        this.devLines.node.x -= 10;
                        this.updatePivotView();
                        break;
                    case 'ArrowRight':
                        if (event.shiftKey) return;
                        this.devLines.node.x += 10;
                        this.updatePivotView();
                        break;
                    case 'ArrowUp':
                        if (event.shiftKey) return;
                        this.devLines.node.y -= 10;
                        this.updatePivotView();
                        break;
                    case 'ArrowDown':
                        if (event.shiftKey) return;
                        this.devLines.node.y += 10;
                        this.updatePivotView();
                        break;
                }
            }
        );

        this.target.node
            .on('pointerdown', event => this.dragStart(event))
            .on('pointermove', () => this.dragMove())
            .on('pointerup', () => this.dragEnd())
            .on('pointerupoutside', () => this.dragEnd())
    }

    dragStart(event) {
        if (this.isDrag) return;

        this.data = event.data;
        this.isDrag = true;
    }

    dragMove() {
        if (!this.isDrag) return;

        const newPosition = this.data.getLocalPosition(this.target.node.parent);
        this.target.node.x = newPosition.x;
        this.target.node.y = newPosition.y;
    }

    dragEnd() {
        if (!this.isDrag) return;

        this.data = null;
        this.isDrag = false;
    }

    updatePivotView() {
        const deltaX = this.devLines.node.x - this.target.node.pivot.x;
        const deltaY = this.devLines.node.y - this.target.node.pivot.y;
        const actualDelta = this.rotateAround(deltaX, deltaY, this.target.node.angle * Math.PI / 180);
        this.target.node.pivot = { x: this.devLines.node.x, y: this.devLines.node.y };
        this.target.node.position.set(this.target.node.x + actualDelta.x, this.target.node.y + actualDelta.y);
    }

    addDevPositionBehavior() {
        console.log('DEV MODE');
        this.setDevAnchor();
        this.setDragEvents();
    }

    setDevAnchor() {
        this.updateDevLinesPositions();
    }

    addDevAngleBehavior() {
        this.setAngleFromKeyboard();
    }

    setAngleFromKeyboard() {
        window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft' && event.shiftKey) this.setAngle(-1);
                else if (event.key === 'ArrowRight' && event.shiftKey) this.setAngle(1);
            }
        );
        window.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this.logProps();
        });
    }

    setAngle(value) {
        this.target.node.angle += value * 1;
    }

    updateDevLinesPositions() {
        this.devLines.node.position.set(this.target.node.pivot.x, this.target.node.pivot.y);
    }

    rotateAround(x, y, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);

        return { x: x * c - y * s, y: x * s + y * c };
    }

    logProps() {
        console.log(
            `Key: ${this.target.key}
             "x": ${ Math.ceil(this.target.node.position.x) }, "y": ${ Math.ceil(this.target.node.position.y) }, 
             "pivot": { "x": ${ this.target.node.pivot.x }, "y": ${ this.target.node.pivot.y } }, 
             "angle": ${ this.target.node.angle }`
        );
    }

}
