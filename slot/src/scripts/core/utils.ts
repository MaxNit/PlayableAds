import { App } from "../..";

export class Utils {
    static addAnimationSequence(name, count) {
        const arr = [];
        for (let i = 1; i < count; i++) {
            arr.push(App.app.getTexture(`${name}_${i}`))
        }
        return arr;
    }

    static getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}