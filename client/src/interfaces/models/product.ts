import Category from "./category";

interface Product {
    id?: number,
    name: string,
    price: number,
    category?: Category,
    image?: string,
}

export default Product;