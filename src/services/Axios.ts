import axios from "axios";
import {Product} from "../flux/Store";

export default class Axios {
    private static readonly _axios = axios.create({
        baseURL: 'https://fakestoreapi.com/'
    })

    static async getProducts(): Promise<Product[] | undefined> {
        const {data} = await this._axios.get('products')

        if (data) return (data as Product[])
    }
}