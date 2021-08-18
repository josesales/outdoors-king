import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Loader from '../components/Loader';
import ImageUpload from '../components/ImageUpload';
import Select from '../components/Select';
import globalStyles from '../globalStyles';
import Category from '../interfaces/models/category';
import ProductInterface from '../interfaces/models/product';
import ProductLocation from '../interfaces/location/productLocation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import DisplayMessage from '../components/DisplayMessage';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../redux/category/categoryAsyncActions';
import { save } from '../redux/product/productAsyncActions';
import { toDecimalString } from '../utils/math';

const initialProduct: ProductInterface = {
    name: '',
    description: '',
    category: {
        name: ''
    },
    price: undefined,
}

const Product = (): JSX.Element => {

    const location = useLocation<ProductLocation>();
    const dispatch = useAppDispatch();
    let productState = null 

    if(location && location.state && location.state.product) {
        productState = {...location.state.product};
        
        if(productState.price) {
            productState.price = toDecimalString(productState.price);
        }
    }


    const history = useHistory();
    const currentUser = useAppSelector(state => state.user.currentUser);

    if (!currentUser || !currentUser.profile || currentUser.profile?.name?.toLowerCase() !== 'admin') {
        history.push('/');
    }

    const [product, setProduct] = useState(productState ? productState : initialProduct);
    const [loading, setLoading] = useState(false);
    const { type, message } = useAppSelector(state => state.message);


    const categories = useAppSelector(state => state.category.categories);
    let productImage: string = product.image ? product.image : ''

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const onProductChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { value, name } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const onCategorySelected = (category: Category) => {
        setProduct({ ...product, category });
    }

    const onImageSelected = (image: string) => {
        productImage = image;
    }

    const onConfirmClick = async () => {

        // if (typeof product.price === 'string') {
        //     //convert from string to number
        //     product.price = Math.round(product.price * 100) / 100
        // }

        await setLoading(true);
        await dispatch(save(product, productImage, currentUser!.token));
        setLoading(false);

        if (!product.id) {
            //clean fields after insertion
            setProduct({ ...initialProduct });
            productImage = '';
        } else {
            //in case of an update redirect the user to the home page
            history.push('/')
        }
    }

    return (
        <div className={globalStyles.pageContainer}>
            {loading ? <Loader /> :
                <React.Fragment>

                    {
                        type && message ? <DisplayMessage type={type} message={message} /> : null
                    }

                    <h2 className={globalStyles.title}>{productState ? 'Edit Product' : 'Add Product'}</h2>

                    <input type="text" name="name" placeholder="Name" required value={product.name} autoComplete="off"
                        className={globalStyles.input} onChange={onProductChange} />

                    <input type="number" min={0} name="price" placeholder="Price" required autoComplete="off"
                        value={product.price!} className={globalStyles.input} onChange={onProductChange} />

                    {
                        categories ?
                            <Select initialValue={product?.category?.name ? product.category.name : ''}
                                placeholder="Category" title="Select the Category of the Product."
                                options={categories} callback={onCategorySelected} /> : null
                    }

                    <textarea name="description" placeholder="Description" value={product.description} autoComplete="off"
                        className={`${globalStyles.input} pt-4 h-32`} onChange={onProductChange} rows={4} cols={100}></textarea>
                        
                    <ImageUpload initialImage={productImage} title="Image" callback={onImageSelected} />


                    <button title="Confirm Operation" onClick={onConfirmClick} className={globalStyles.button}>
                        {productState ? 'Edit' : 'Add'}
                    </button>
                </React.Fragment>
            }
        </div>
    );
}

export default Product;