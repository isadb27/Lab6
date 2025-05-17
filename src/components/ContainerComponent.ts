import {store} from "../flux/Store";

import './../views/HomeView'
import './../views/CartView'

class ContainerComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.render()
    }

    private render(state = store.getState()) {
        if (!this.shadowRoot) return
        const styles = new CSSStyleSheet()
        styles.replaceSync(`
        :host {
            display: flex;
            flex-direction: column;
        }
        `)
        this.shadowRoot.adoptedStyleSheets = [styles]
        if (state.loading) this.shadowRoot.innerHTML = '<h1>Loading...</h1>'
        else if (state.location === "home") this.shadowRoot.innerHTML = '<home-view></home-view>'
        else if (state.location === "cart") this.shadowRoot.innerHTML = '<cart-view></cart-view>'

    }

}

customElements.define('container-component', ContainerComponent)