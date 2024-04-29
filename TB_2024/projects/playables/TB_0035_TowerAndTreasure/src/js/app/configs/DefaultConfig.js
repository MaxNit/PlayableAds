import { Background } from "../Core/renderElements/Background";
import { UI } from "../Core/renderElements/UI";
import { Camera } from "../Core/renderElements/Camera";
import { Packshot } from "../packshot/Packshot";
import { Scene } from "../Core/renderElements/Scene";

export const DefaultConfig = {
    scene: { 
        type: Scene, 
        id: 'scene',
        children: {
            background: { type: Background, id: 'bg', texture: 'bg' },
            camera: { type: Camera, id: 'camera' },
            ui: { type: UI, id: 'ui' },
        } 
    },
    packshot: { type: Packshot, id: 'packshot' }
}