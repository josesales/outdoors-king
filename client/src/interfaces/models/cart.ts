import Product from "./product";
import User from "./user";

export interface Cart {
    id?: string,
    user?: User,
    cartProducts?: CartProduct[],
}

export interface CartProduct {
    id?: string,
    cart?: Cart,
    product?: Product,
    quantity?: number,
}