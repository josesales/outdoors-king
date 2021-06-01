import Item from "./item";

interface CartItem {
    id?: number,
    item?: Item,
    quantity: number,
}

export default CartItem;