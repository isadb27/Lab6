import {store} from "./flux/Store";

class Template extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    private render(state = store.getState()) {
        if (!this.shadowRoot) return

        this.shadowRoot.innerHTML = `
        <style>
        :root {
         display: block;
        }
        </style>
        `
    }

}

customElements.define('template-component', Template)