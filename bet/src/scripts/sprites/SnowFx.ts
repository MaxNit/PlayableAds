import { App } from "../..";
import { Container } from "../core/Container";
import * as particles from '@pixi/particle-emitter'

export class SnowFx extends Container {

    private emitter: particles.Emitter;

    constructor(config) {
        super(config)
        this.init();
    }

    private init(): void {
        //@ts-ignore
        this.emitter = new particles.Emitter(this, {
            "lifetime": {
                "min": 4,
                "max": 4
            },
            "ease": [
                {
                    "s": 0,
                    "cp": 0.379,
                    "e": 0.548
                },
                {
                    "s": 0.548,
                    "cp": 0.717,
                    "e": 0.676
                },
                {
                    "s": 0.676,
                    "cp": 0.635,
                    "e": 1
                }
            ],
            "frequency": 0.04,
            "emitterLifetime": 0,
            "maxParticles": 300,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.73
                                },
                                {
                                    "time": 1,
                                    "value": 0.46
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 200,
                        "max": 200
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.15
                                },
                                {
                                    "time": 1,
                                    "value": 0.2
                                }
                            ]
                        },
                        "minMult": 0.5
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 0,
                        "maxSpeed": 200,
                        "minStart": 50,
                        "maxStart": 70
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            App.app.getTexture('snow100')
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "rect",
                        "data": {
                            "x": -1000,
                            "y": -1390,
                            "w": 1390,
                            "h": 1390
                        }
                    }
                }
            ]
        })

        var elapsed = Date.now();
        App.app.ticker.add(() => {
            var now = Date.now();
            this.emitter.update((now - elapsed) * 0.001);
            elapsed = now;
        })
    }

    public start(): void {
        this.emitter.emit = true;
    }
}