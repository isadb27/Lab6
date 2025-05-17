import {store} from '../flux/Store';

import './../components/TopBarComponent'
import './../components/ContainerComponent'

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        store.subscribe(this.render.bind(this))

        this.render();
    }

    async render(state = store.getState()) {
        if (!this.shadowRoot)
            return

        this.shadowRoot.innerHTML = `
<style>
:host {
margin: 0;
box-sizing: border-box;
display: flex;
flex-direction: column;
min-height: 100dvh;
background-color: rgb(var(--theme-color-background));

container-component {
flex: 1;
padding: .5rem;
}
}
</style>
<top-bar-component></top-bar-component>

<container-component></container-component>
        `;

        // if (!this.shadowRoot) return;

        // this.shadowRoot.innerHTML = `app`;
    }
}

export default Root;