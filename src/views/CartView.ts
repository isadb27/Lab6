import {store} from "../flux/Store";

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
            margin: 0;
        }
        
        :host {
         display: flex;
         flex-direction: column;
         height: 100%;
         flex: 1;
         gap: .5rem;
         
            .top {
                display: flex;
                align-items: center;
                gap: .5rem;
                
                h1 {
                    font-family: Montserrat;
                }
            }
            
            .bottom {
                flex: 1;
                display: flex;
                gap: .5rem;
                
                .left {
                    flex: 1;
                    
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    grid-auto-rows: auto;
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
                
                .right {
                    
                    width: 400px;
                    
                    .right-container {
                        box-shadow: var(--elevation2);
                        border-radius: .5rem;
                        padding: .5rem;
                        
                        .total {
                            span:before {
                            content: '$';
                            }
                        }
                    }
                }
            }
        }
        </style>
        
        <div class="top">
        <icon-component class="navToHome" icon="arrow-left-long"></icon-component>
        <h1>Cart</h1>
</div>

<div class="bottom">
    <div class="left">
        ${state.products.filter((p => state.cart.includes(p.id))).map((product) => `
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
</div>

<div class="right">
    <div class="right-container">
    
    <h2 class="total">Total: <span>${state.products.filter((p => state.cart.includes(p.id))).reduce((acc, item) => acc + item.price, 0)}</span></h2>
</div>
</div>
</div>
        `

        this.shadowRoot.querySelector('.navToHome')?.addEventListener('click', (event) => {
            AppDispatcher.dispatch({type: 'navigateTo', payload: 'home'})
        })

        this.shadowRoot.querySelectorAll('.removeFromCart').forEach(e => e.addEventListener('click', (event) => {
            // @ts-ignore: works
            // console.log(event)
            AppDispatcher.dispatch({type: 'removeFromCart', payload: {id: Number(event.target.getAttribute('itemid'))}})
        }))
    }

}

customElements.define('cart-view', Template)