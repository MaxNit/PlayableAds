import Application from "./Core/Application";
import { Sprite } from "./Core/renderElements/Sprite";
import { GameController } from "./GameController";
import Sound from "./Sound";
import { DefaultConfig } from "./configs/DefaultConfig";

export default class YouApplication extends Application {
    constructor(data = {}) {
        super(data);
        this.renderElements = {};

        // Обязательные функции: без разницы что тут будет, методы mute и unmute обязательны
        this.sounds = new Sound({ volume: .25}, this, ()=> {
            this.sounds.play("music", {
                volume: 0.5,
                loop: true
            })
        });


        // хак для того, что бы глушить звуки, когда вкладка не активна - знаешь способ лучше, перепиши :) 
        this.globalTimer = setInterval(() => {
            if (document.hidden) {
                this.sounds && this.sounds.pauseAudioContext();
            } else {
                this.sounds && this.sounds.resumeAudioContext();
            }
        }, 100)
    }

    run() {
        super.run();

        // Запуск геймплея
        console.log('isPortrait:', this.isPortrait);
        console.log('width:', this.width);
        console.log('height:', this.height);
        console.log('ratio:', this.ratio);
        console.log('landscapeRatio:', this.landscapeRatio);
        console.log('ratioLess(sm)', this.ratioLess('sm'));

        this.readConfig();
        superApp.emit('onLoad');
        this.gameController = new GameController();
    }

    getElementByID(id) {
        return this.renderElements[id] || null;
    }

    createRenderElement(config) {
        const type = config.type ? config.type : Sprite;
        const renderElement = new type(config);
        const id = config.id ? config.id : null;

        if (id)
            this.renderElements[config.id] = renderElement;

        return renderElement;
    }

    renderElementsOnLoad() {
        const keys = Object.keys(this.renderElements);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const element = this.renderElements[key];
            element.onLoad();
        }
    }

    resizeApp(screenWidth, screenHeight) {
        super.resizeApp(screenWidth, screenHeight)

        const keys = Object.keys(this.renderElements);
        keys.forEach(key => this.renderElements[key].onResize())
    }

    readConfig() {
        const keys = Object.keys(DefaultConfig);

        keys.forEach(key => {
            const config = DefaultConfig[key];
            config.key = key;
            const renderElement = this.createRenderElement(config);
            this.stage.addChild(renderElement.node);
        })
    }

}
