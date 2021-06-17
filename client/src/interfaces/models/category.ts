import Product from "./product";

interface Category {
    id?: number,
    name: string,
    products?: Array<Product>,
}

export default Category;