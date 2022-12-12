import { App } from "../..";
import { Container } from "../core/Container";
import * as particles from '@pixi/particle-emitter'

export class SparksFx extends Container {

    private emitter: particles.Emitter;

    constructor(config) {
        super(config)
        this.init();
    }

    private init(): void {
        //@ts-ignore
        this.emitter = new particles.Emitter(this, {
            "lifetime": {
                "min": 0.2,
                "max": 0.3
            },
            "frequency": 0.05,
            "emitterLifetime": .4,
            "maxParticles": 40,
            "addAtBack": true,
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
                                    "value": 1
                                },
                                {
                                    "time": 1,
                                    "value": 0.31
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeed",
                    "config": {
                        "speed": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 1000
                                },
                                {
                                    "time": 1,
                                    "value": 200
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.5
                                },
                                {
                                    "time": 1,
                                    "value": 1
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 100,
                        "maxSpeed": 200,
                        "minStart": 225,
                        "maxStart": 320
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            App.app.getTexture('spark')
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 0,
                            "innerRadius": 0,
                            "affectRotation": false
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