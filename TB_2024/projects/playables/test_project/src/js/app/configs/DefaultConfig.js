import { Background } from "../Core/renderElements/Background";
import { UI } from "../Core/renderElements/UI";
import { Scene } from "../Core/renderElements/Scene";
import { Main } from "../Core/renderElements/Main";

export const DefaultConfig = {
    scene: { 
        type: Scene, 
        id: 'scene',
        children: {
            background: { type: Background, id: 'bg' },
            main: { type: Main, id: 'main' },
            ui: { type: UI, id: 'ui' },
        } 
    }
}