import {store} from "../flux/Store";
import './IconComponent'
import {globalStyles} from "../utils/styles";
import {AppDispatcher} from "../flux/Dispatcher";

class TopBarComponent extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        store.subscribe(this.render.bind(this))

        this.render()
    }

    render(state = store.getState()) {
        if (!this.shadowRoot) return
        // this.shadowRoot.adoptedStyleSheets = [globalStyles]
        this.shadowRoot.innerHTML = `
<style>
:host {
    height: 60px;
    background-color: rgb(var(--theme-color-primaryContainer));
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: .5rem 1rem;
    box-shadow: var(--elevation2);
    
    .title {
        span {
            font-family: Chonburi;
            font-size: 2rem;
        }
    }
    
    .icons {
        display: flex;
        align-items: center;
    }
}
</style>

<div class="title"><span>
Isabella's shop
</span></div>

<div class="icons">
<icon-component title="Go to cart" class="cartButton" role="button" badge="${state.cart.length}" icon="cart-shopping"></icon-component>
</div>
        `

        this.shadowRoot.querySelector('.cartButton')?.addEventListener('click', (event) => {
            AppDispatcher.dispatch({type: 'navigateTo', payload: 'cart'})
        })
    }
}

customElements.define('top-bar-component', TopBarComponent)