import Category from "./category";

interface Product {
    id?: string,
    name?: string,
    description?: string,
    price?: string,
    category?: Category,
    image?: string,
}

export default Product;