import Product from "./product";

interface Category {
    id?: string,
    name?: string,
    products?: Array<Product>,
}

export default Category;