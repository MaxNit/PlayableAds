import { Bg } from "./sprites/Bg";
import { CTAButton } from "./sprites/CTAButton";
import { Item } from "./sprites/Item";
import { Panel } from "./sprites/Panel";
import { Picture } from "./sprites/Picture";
import { Title } from "./sprites/Title";

interface SpritePositionConfig {
    x?: number;
    y?: number;
};

export interface SpriteConfig {
    name: string;
    objectId?: string;
    class?: any,
    position?: SpritePositionConfig;
    texture?: any;
    children?: any
}

export default [
    {
        name: 'bgLayer',
        objectId: 'bgLayer',
        children: [
            {
                name: 'bg',
                objectId: 'bg',
                class: Bg
            }
        ]
    },
    {
        name: 'mainLayer',
        objectId: 'mainLayer',
        children: [
            {
                name: 'picture',
                objectId: 'picture',
                class: Picture,
                children: [
                    {
                        name: 'mirror',
                        objectId: 'resultMirror',
                        texture: 'mirror',
                        alpha: 0,
                        x: 360,
                        y: -290
                    },
                    {
                        name: 'cat',
                        objectId: 'resultCat',
                        texture: 'cat',
                        scale: { x: 2.15, y: 2.15 },
                        alpha: 0,
                        x: -220,
                        y: 345
                    },
                    {
                        name: 'grass',
                        objectId: 'resultGrass',
                        texture: 'grass',
                        alpha: 0,
                        x: -265,
                        y: -280
                    },
                    {
                        name: 'shelf',
                        objectId: 'resultShelf',
                        texture: 'shelf',
                        alpha: 0,
                        x: -395,
                        y: -110
                    },
                    {
                        name: 'towel',
                        objectId: 'resultTowel',
                        texture: 'towel',
                        alpha: 0,
                        x: 100,
                        y: 250
                    }
                ]
            },
            {
                name: 'finalPicture',
                texture: 'pictureFinal',
                objectId: 'finalPicture',
                scale: { x: 0.6, y: 0.6 },
                alpha: 0
            },
            {
                name: 'ctaButton',
                objectId: 'ctaButton',
                class: CTAButton,
                texture: 'download',
                positions: {
                    vertical: {
                        x: 0, 
                        y: 620
                    },
                    horizontal: {
                        x: -500, 
                        y: 0
                    }
                }
            }
        ]
    },
    {
        name: 'uiLayer',
        objectId: 'uiLayer',
        children: [
            {
                name: 'title',
                objectId: 'title',
                class: Title,
                scale: { x: 0.8, y: 0.8 },
                positions: {
                    vertical: {
                        x: 0, 
                        y: -450
                    },
                    horizontal: {
                        x: -500, 
                        y: -200
                    }
                }
            },
            {
                name: 'panel',
                objectId: 'panel',
                class: Panel, 
                scale: { x: .5, y: .5 },
                positions: {
                    vertical: {
                        x: 0,
                        y: 430
                    },
                    horizontal: {
                        x: 450,
                        y: 0
                    }
                },
                children: [
                    {
                        name: 'mirror',
                        objectId: 'panelMirror',
                        class: Item,
                        image: 'mirror',
                        x: -400,
                        scale: { x: 0.6, y: 0.6 }
                    },
                    {
                        name: 'cat',
                        objectId: 'panelCat',
                        class: Item,
                        image: 'cat',
                        x: -200,
                        scale: { x: 1.5, y: 1.5 }
                    },
                    {
                        name: 'shelf',
                        objectId: 'panelShelf',
                        class: Item,
                        image: 'shelf',
                        x: 0,
                        scale: { x: 1.2, y: 1.2 }
                    },
                    {
                        name: 'towel',
                        objectId: 'panelTowel',
                        class: Item,
                        image: 'towel',
                        x: 200,
                        scale: { x: 0.8, y: 0.8 }
                    },
                    {
                        name: 'grass',
                        objectId: 'panelGrass',
                        class: Item,
                        image: 'grass',
                        x: 400,
                        scale: { x: 1.4, y: 1.4 }
                    }
                ]
            },
            {
                name: 'hand',
                texture: 'hand',
                objectId: 'hand',
                alpha: 0,
                anchor: { x: 0.25, y: 0.1 }
            }
        ]
    }
] as SpriteConfig[];
