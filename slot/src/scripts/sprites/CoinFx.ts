import { App } from "../..";
import { Container } from "../core/Container";
import * as particles from '@pixi/particle-emitter'

export class CoinFx extends Container {

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
                    "e": -0.548
                },
                {
                    "s": 0.548,
                    "cp": 0.717,
                    "e": -0.676
                },
                {
                    "s": 0.676,
                    "cp": 0.635,
                    "e": .3
                }
            ],
            "frequency": 0.002,
            "emitterLifetime": 1,
            "maxParticles": 1000,
            "addAtBack": false,
            "pos": {
                "x": -window.innerWidth / 2,
                "y": -window.innerHeight / 2
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": .9
                                },
                                {
                                    "time": 1,
                                    "value": 1
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 500,
                        "max": 800
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 1
                                },
                                {
                                    "time": 1,
                                    "value": 1.5
                                }
                            ]
                        },
                        "minMult": 0.2
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 10,
                        "minSpeed": 100,
                        "maxSpeed": 200,
                        "minStart": 50,
                        "maxStart": 70
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            App.app.getTexture('coin')
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "rect",
                        "data": {
                            "x": -window.innerWidth / 2,
                            "y": -window.innerHeight / 2,
                            "w": window.innerWidth * 4,
                            "h": window.innerHeight * 4
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
        this.emitter.emit = false;
    }

    public start(): void {
        this.emitter.emit = true;
    }
}