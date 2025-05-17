import {store} from "./../flux/Store";
import './../components/IconComponent'
import {AppDispatcher} from "../flux/Dispatcher";

class Template extends HTMLElement{
    constructor() {
        super();

        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        store.subscribe(this.render.bind(this))

        this.render()
    }

    private render(state = store.getState()) {
        if (!this.shadowRoot) return

        this.shadowRoot.innerHTML = `
        <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        
        :host {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: .5rem;
            
            .item {
                  box-shadow: var(--elevation2);
                  overflow: hidden;
                  display: flex;
                  flex-direction: column;
                  border-radius: .5rem;
                  background-color: rgb(var(--theme-color-surfaceContainer));
                  /*max-width: 200px;*/
                  /*width: 100%;*/
            
                position: relative;
            
                  img {
                    padding: .5rem;
                    width: 100%;
                    /*height: 100%;*/
                    object-fit: contain;
                    aspect-ratio: 1;
                    background-color: white;
                    box-shadow: var(--elevation2);
                    
                    border-radius: 0 .5rem .5rem;
                  }
            }
            
            .data {
                padding: 0.5rem .5rem 0;
                flex: 1;
                
                h4 {
                    font-size: .8rem;
                    font-family: Montserrat;
                    
                    display: -webkit-box;

                    -webkit-line-clamp: 2; /* Máximo de 2 líneas */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .description {
                    font-family: Montserrat;
                    
                    display: -webkit-box;

                    -webkit-line-clamp: 4; /* Máximo de 2 líneas */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    
                    text-align: justify;
                    
                    font-size: .75rem;
                }
                
                .price {
                    font-size: 1.1rem;
                    font-family: Alegreya;
                    font-weight: bold;
                    
                    &:before {
                        content: "$";
                    }
                }
            }
            
            .actions {
                padding: .5rem;
                padding-top: 0;
            }
        }
        </style>
        
        ${state.products.map((product) => `
            <div class=item>
            <img src="${product.image}" alt="">
            <div class="data">
            <h4>${product.title}</h4>
            <span class="description">${product.description}</span>
            <span class="price">${product.price}</span>
</div>
            
            <div class="actions">
                ${(state.cart.find((cartItem => cartItem == product.id))?
                `
                    <icon-component  itemid="${product.id}" title="remove item from cart" class="removeFromCart" role="button" icon="cart-minus"></icon-component>
                `
                :
                `
                    <icon-component  itemid="${product.id}" title="add item to cart" class="addToCart" role="button" icon="cart-plus"></icon-component>
                `)}
            </div>
</div>
        `).join('')}
        `
        this.shadowRoot.querySelectorAll('.addToCart').forEach(e => e.addEventListener('click', (event) => {
            // @ts-ignore: works
            // console.log(event)
            AppDispatcher.dispatch({type: 'addToCart', payload: {id: Number(event.target.getAttribute('itemid'))}})
        }))
        this.shadowRoot.querySelectorAll('.removeFromCart').forEach(e => e.addEventListener('click', (event) => {
            // @ts-ignore: works
            // console.log(event)
            AppDispatcher.dispatch({type: 'removeFromCart', payload: {id: Number(event.target.getAttribute('itemid'))}})
        }))


    }

    
}

customElements.define('home-view', Template)