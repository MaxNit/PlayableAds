import { PearlBar } from "../../PearlBar";
import { Container } from "./Container";
import { InstallButton } from "./InstallButton";
import { MuteButton } from "./MuteButton";
import { RedirectContainer } from "./RedirectContainer";
import { Sprite } from "./Sprite";

const elementConfig = {
    children: { 
        mannequinUIHolder: { type: Container, id: 'mannequinUIHolder' },
        pearlBar: { type: PearlBar, id: 'pearlBar' },
        muteButton: { type: MuteButton, texture: 'icons/soundOff' },
        redirectContainer: { type: RedirectContainer, id: 'redirectContainer' },
        installButton: { type: InstallButton, texture: 'installButton', id: 'installButton' }
     }
}

export class UI extends Container {
    constructor(config) {
        super(utils.merge(config, elementConfig));
        this.mannequinUIHolder = this.child('mannequinUIHolder');
        this.muteButton = this.child('muteButton');
        this.onResize();
    }

    onResize() {
        this.mannequinUIHolder.node.position.set(superApp.app.width / 2, superApp.app.height / 2);
        this.muteButton.node.position.set(50, superApp.app.height - 50);
    }
}