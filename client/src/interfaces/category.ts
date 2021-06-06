import Item from "./item";

interface Category {
    id?: number,
    name: string,
    items?: Array<Item>,
}

export default Category;