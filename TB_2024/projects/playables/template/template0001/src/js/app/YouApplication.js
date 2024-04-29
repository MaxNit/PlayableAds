import Application from "./Core/Application";
import Sound from "./Sound";

export default class YouApplication extends Application {
    constructor(data = {}) {
        super(data);

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

        // Инициализация плейбла

        let test = new PIXI.Sprite(utils.getTexture('icons/soundOn'));
        test.x = 200
        test.y = 200
        this.stage.addChild(test);
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
    }

    resizeApp(screenWidth, screenHeight) {
        super.resizeApp(screenWidth, screenHeight)

        // Логика ресайза (престройка спрайтов)
    }

}