import Category from "./category";

interface Product {
    id?: string,
    name?: string,
    description?: string,
    price?: number,
    category?: Category,
    image?: string,
}

export default Product;