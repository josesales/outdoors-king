import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ImageUpload from '../components/ImageUpload';
import Select from '../components/Select';
import globalStyles from '../globalStyles';
import Category from '../interfaces/models/category';
import ProductInterface from '../interfaces/models/product';
import ProductLocation from '../interfaces/location/productLocation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../redux/category/categoryAsyncActions';

const Product = (): JSX.Element => {

    const initialProduct: ProductInterface = {
        name: '',
        category: {
            name: ''
        },
        price: 0,
    }

    const location = useLocation<ProductLocation>();
    const dispatch = useAppDispatch();
    const productState = location && location.state && location.state.product;

    const history = useHistory();
    const currentUser = useAppSelector(state => state.user.currentUser);
    if (currentUser?.profile?.name?.toLowerCase() !== 'admin') {
        history.push('/');
    }

    const [product, setProduct] = useState(productState ? productState : initialProduct);

    // const categories: Category[] = categoriesList;

    const categories = useAppSelector(state => state.category.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const onProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setProduct({ ...product, [name]: value });
    };

    const onCategorySelected = (category: Category) => {
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

            {
                categories ?
                    <Select placeholder="Category" title="Select the Category of the Product."
                        options={categories} callback={onCategorySelected} /> : null
            }

            <ImageUpload title="Image" />

            <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                {productState ? 'Edit' : 'Add'}
            </button>

        </div>
    );
}

export default Product;