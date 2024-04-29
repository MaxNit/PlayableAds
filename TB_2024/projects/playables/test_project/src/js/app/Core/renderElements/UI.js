import { Container } from "./Container";

const elementConfig = {
    children: { 
     }
}

export class UI extends Container {
    constructor(config) {
        super(config);

        const superBox = superApp.app.getElementByID('superBox');
        console.log(superBox);
    }


}