import Product from "./product";

interface CartProduct {
    id?: number,
    product?: Product,
    quantity: number,
}

export default CartProduct;