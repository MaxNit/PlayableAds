import config, {SpriteConfig} from '../config';
import { Sprite } from './Sprite';
import { sprites } from '../const';
import {Application as PIXIApplication, Texture} from 'pixi.js';
import { Container } from './Container';

export class Application extends PIXIApplication {

    flags: Record<string, boolean> = {};
    valueScale: number = 0;
    countBox: number = 0;

    constructor() {
        super({
            backgroundColor: 0xffffff,
            width: window.innerWidth,
            height: window.innerHeight,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            antialias: true
        });

        this.loader.baseUrl = './images';
        this.stage.sortableChildren = true;
        this.flags = {
            isWin: false
        }
        this.appendView();
        this.loadTextures();
        this.loader.onComplete.add(() => this.init());
        window.addEventListener('resize', () => this.resizeApp());
    }

    private init(): void {
        console.log('DONE LOADING!');
        this.readConfig();
        this.resizeApp();
    }

    public resizeApp() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.stage.x = window.innerWidth / 2;
        this.stage.y = window.innerHeight / 2;
        this.stage.children.forEach((container) => {
            if (window.innerWidth < window.innerHeight) {
                container.scale.set(window.innerHeight / 1390);
                this.valueScale = window.innerHeight / 1390;
            } else {
                container.scale.set(window.innerWidth / 1390);
                this.valueScale = window.innerWidth / 1390;
            }
        });
    }

    private appendView(): void {
        document.body.appendChild(this.view);
    }

    public getTexture(texture: string): Texture {
        return this.loader.resources[texture].texture;
    }

    public getSprite(objectId: string): any {
        return sprites.find((s) => s.objectId === objectId);
    }

    private loadTextures(): void {
        window['res'].forEach(texture => {
            if (texture.name && texture.src) this.loader.add(texture.name, texture.src);
        })
        this.loader.load();
    }

    private readConfig(): void {
        config.forEach(configItem => {
            const displayObject = this.createChildren(configItem);
            this.stage.addChild(displayObject);
        })
    }

    public createChildren(configItem): any {
        if (configItem.texture) {
            if (!configItem.class) { 
                const texture = this.getTexture(configItem.texture);
                configItem.texture = texture;
                const sprite = new Sprite(configItem);
                sprites.push(sprite);
                return sprite;
            } else {
                const spriteClass = configItem.class;
                const texture = this.getTexture(configItem.texture);
                configItem.texture = texture;
                const sprite = new spriteClass(configItem);
                sprites.push(sprite);
                return sprite;
            }
        } else {
            if (!configItem.class) {
                const container = new Container(configItem);
                sprites.push(container);
                return container;
            } else {
                const containerClass = configItem.class;
                const container = new containerClass(configItem);
                sprites.push(container);
                return container;
            }
            
        }
    }

    public getOrientation(): string {
        return innerWidth < innerHeight ? 'vertical' : 'horizontal';
    }

    win(): void {
        this.flags.isWin = true;
    }

    // toStore(platform, appStore, playMarket) { //метод перехода в стор
    //     switch (platform) {
    //         case PLATFORMS.fb:
    //             FbPlayableAd.onCTAClick();
    //             break;
    //         case PLATFORMS.un:
    //             var userAgent = navigator.userAgent || navigator.vendor;
    //             var url = appStore;
    //             var android = playMarket;
    //             if (/android/i.test(userAgent)) {
    //                 url = android;
    //             }
    //             mraid.open(url);
    //             break;
    //         case PLATFORMS.al:
    //             var userAgent = navigator.userAgent || navigator.vendor;
    //             var url = appStore;
    //             var android = playMarket;
    //             if (/android/i.test(userAgent)) {
    //                 url = android;
    //             }
    //             mraid.open(url);
    //             break;
    //         case PLATFORMS.is:
    //             dapi.openStoreUrl();
    //             break;
    //         case PLATFORMS.tt:
    //             window.openAppStore();
    //             break;
    //         case PLATFORMS.mt:
    //             window.install && window.install();
    //             gameClose() ;
    //             break;
    //     }
    // }
}
