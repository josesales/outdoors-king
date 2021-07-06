import Category from "./category";

interface Product {
    id?: string,
    name?: string,
    price?: number,
    category?: Category,
    image?: string | ArrayBuffer,
}

export default Product;