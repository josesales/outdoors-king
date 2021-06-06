import Category from "./category";

interface Item {
    id?: number,
    name: string,
    price: number,
    category?: Category,
    image?: string,
}

export default Item;