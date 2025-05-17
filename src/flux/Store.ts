import {AppDispatcher, Action} from './Dispatcher';
import Axios from "../services/Axios";

export declare interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export declare interface State {
    loading: boolean;
    cart: number[];
    products: Product[];
    location: 'home' | 'cart'
};

type Listener = (state: State) => void;

class Store {
    private _myState: State = {
        loading: true,
        products: [],
        cart: [],
        location: 'home'
    }

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));

        this._load()
    }

    private _load() {
        const storageStore = localStorage.getItem('store')

        if (storageStore) {
            this._myState = JSON.parse(storageStore)
            this._myState.loading = false
            this._emitChange()
        } else {
            Axios.getProducts()
                .then((products) => {
                    this._myState.loading = false
                    if (products) {
                        this._myState.products = products
                        this._myState.loading = false
                        this._persist()
                        this._emitChange()
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
                .finally(() => {
                    console.log(this._myState)
                })

        }
    }

    private _persist() {
        localStorage.setItem('store', JSON.stringify(this._myState))
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case "addToCart":
                this._myState.cart.push((action.payload as { id: number }).id)
                console.log(action.payload)

                this._emitChange()
                break;

            case "removeFromCart": {
                const index: number = this._myState.cart.findIndex(cartItem => cartItem === ((action.payload as {
                    id: number
                }).id))

                if (index > -1) {
                    this._myState.cart.splice(index, 1)
                }
                this._emitChange()
                break
            }

            case "navigateTo":
                this._myState.location = (action.payload as 'home' | "cart")
                this._emitChange()
                break
        }
    }

    private _emitChange(): void {
        this._persist()

        for (const listener of this._listeners) {
            listener(this._myState)
        }

        console.log("changeEmited:", this._myState)
    }

    unsubscribe(listener: Listener): void {
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener)
    }
}

export const store = new Store();