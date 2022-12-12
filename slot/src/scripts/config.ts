import { CoinFx } from "./sprites/CoinFx";
import { Panel } from "./sprites/Panel";
import { SlotMachine } from "./sprites/SlotMachine/SlotMachine";
import { SpinButton } from "./sprites/SlotMachine/SpinButton";

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
                name: 'stage',
                objectId: 'stage',
                texture: 'stage',
                scale: { x: 2, y: 2 }
            }
        ]
    },
    {
        name: 'mainLayer',
        objectId: 'mainLayer',
        children: [
            {
                name: 'slotMachine',
                objectId: 'slotMachine',
                class: SlotMachine,
                texture: 'frame',
                scale: { x: 0.9, y: 0.9 }
            },
            {
                name: 'spinButton',
                objectId: 'spinButton',
                class: SpinButton,
                texture: 'spin',
                positions: {
                    vertical: {
                        x: 0, y: 300
                    },
                    horizontal: {
                        x: 550, y: 0
                    }
                }
            },
            {
                name: 'spinNowContainer',
                objectId: 'spinNowContainer',
                scale: { x: 1.6, y: 1.6 },
                positions: {
                    vertical: {
                        x: 0, y: 450
                    },
                    horizontal: {
                        x: 550, y: 130
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
                name: 'panel',
                objectId: 'panel',
                texture: 'panel',
                class: Panel,
                positions: {
                    vertical: {
                        x: -180,
                        y: -250
                    },
                    horizontal: {
                        x: -570,
                        y: -220
                    }
                }
            },
            {
                name: 'blackRect',
                objectId: 'blackRect',
                texture: 'back',
                alpha: 0,
                visible: false
            },
            {
                name: 'coinFx',
                class: CoinFx,
                objectId: 'coinFx'
            }
        ]
    }
] as SpriteConfig[];
