import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ImageUpload from '../components/ImageUpload';
import Select from '../components/Select';
import globalStyles from '../globalStyles';
import Category from '../interfaces/category';
import ProductInterface from '../interfaces/product';
import ProductLocation from '../interfaces/productLocation';
import { categoriesList } from '../testData/category';

const Product = (): JSX.Element => {

    const initialProduct: ProductInterface = {
        name: '',
        category: {
            name: ''
        },
        price: 0,
    }

    const location = useLocation<ProductLocation>();
    const productState = location && location.state && location.state.product;

    const [product, setProduct] = useState(productState ? productState : initialProduct);

    const categories: Category[] = categoriesList;

    const onProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setProduct({ ...product, [name]: value });
    };

    const onCategorySelected = (category: Category) => {
        console.log(category);
        setProduct({ ...product, category });
    }

    const onConfirmClick = () => {
        //convert from string to number
        product.price = +product.price;
        console.log(product)
    }

    return (
        <div className={globalStyles.pageContainer}>

            <h2 className={globalStyles.title}>{productState ? 'Edit Product' : 'Add Product'}</h2>

            <input type="text" name="name" placeholder="Name" required value={product.name} autoComplete="off"
                className={globalStyles.input} onChange={onProductChange} />

            <input type="number" min={0} name="price" placeholder="Price" required autoComplete="off"
                className={globalStyles.input} onChange={onProductChange} />

            <Select placeholder="Category" title="Select the Category of the Product."
                options={categories} callback={onCategorySelected} />

            <ImageUpload title="Image" />

            <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                {productState ? 'Edit' : 'Add'}
            </button>

        </div>
    );
}

export default Product;