import { Balance } from "./sprites/Balance";
import { Box } from "./sprites/Box";
import { PopUp } from "./sprites/PopUp";
import { SnowFx } from "./sprites/SnowFx";
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
                name: 'bg_v',
                objectId: 'bg_v',
                texture: 'bg_v',
            },
            {
                name: 'bg_l',
                objectId: 'bg_l',
                texture: 'bg_l',
                visible: false
            },
        ]

    },
    {
        name: 'mainLayer',
        objectId: 'mainLayer',
        children: [{
            name: 'box1',
            class: Box,
            objectId: 'box1',
            texture: 'box_down',
            type: 500,
            x: -200,
            y: 50,
            alpha: 1
        },
        {
            name: 'box2',
            class: Box,
            objectId: 'box2',
            texture: 'box_down',
            type: 500,
            x: 0,
            y: 50,
            alpha: 1
        },
        {
            name: 'box3',
            class: Box,
            objectId: 'box3',
            texture: 'box_down',
            type: 1000,
            x: 200,
            y: 50,
            alpha: 1
        },
        {
            name: 'snowFx',
            objectId: 'snowFx',
            class: SnowFx
        }
    ]
    },
    {
        name: 'uiLayer',
        objectId: 'uiLayer',
        children: [
            {
                name: 'logo',
                objectId: 'logo',
                texture: 'logo',
                positions: {
                    vertical: {
                        x: 0,
                        y: -500
                    },
                    horizontal: {
                        x: 0,
                        y: -200
                    }
                }
            },
            {
                name: 'title',
                objectId: 'title',
                class: Title,
                positions: {
                    vertical: {
                        x: 0,
                        y: -200
                    },
                    horizontal: {
                        x: 0,
                        y: -50
                    }
                }
            },
            {
                name: 'balance',
                class: Balance,
                objectId: 'balance',
                texture: 'balance_button',
                positions: {
                    vertical: {
                        x: -120,
                        y: 550
                    },
                    horizontal: {
                        x: -350,
                        y: 250
                    }
                }
            },
            {
                name: 'blackRect',
                objectId: 'blackRect',
                texture: 'back',
                alpha: 0
            },
            {
                name: 'popUp',
                class: PopUp,
                objectId: 'popUp',
                scale: { x: 1.3, y: 1.3 },
                alpha: 0
            }
        ]
    }
] as SpriteConfig[];
