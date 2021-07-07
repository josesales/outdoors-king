import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import globalStyles from '../globalStyles';
import Category from '../interfaces/models/category';
import Product from '../interfaces/models/product';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setProducts } from '../redux/product/productAsyncActions';
import CategoryProduct from './CategoryProduct';
import Loader from '../components/Loader';

const CategoryProducts = ({ category, minified }: { category: Category, minified?: boolean }) => {

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const dispatch = useAppDispatch();

    let products: Product[] = [];

    const productsReducer = useAppSelector(state => state.product.products!);

    if (minified) {
        //the 3 first products of the category
        products = category.products!;
    } else {
        //all the products
        products = productsReducer;
    }


    useEffect(() => {
        const fetchProducts = async () => {
            if (!minified) {
                await setLoading(true);
                //populate all the products of the selected category
                await dispatch(setProducts({
                    category: {
                        id: category.id
                    }
                }));
                setLoading(false);
            }
        }
        fetchProducts();
    }, [dispatch, minified, category])

    const { name } = category;
    let productsUi = null;

    if (products) {
        productsUi = products.map(product => (<CategoryProduct key={product.id} product={product} />));
    }

    const showAllProducts = () => {
        history.push('/category', { category });
    }

    return (
        <React.Fragment>

            {loading ? <Loader /> :

                <div className="mb-20">

                    {
                        name ?
                            <div className="w-full flex justify-between items-center">

                                <h1 onClick={showAllProducts} className={`mb-8 sm:ml-8 cursor-pointer capitalize 
                                    ${globalStyles.textXBig} ${globalStyles.borderBottomHover}`}>
                                    {name}
                                </h1>

                                {
                                    minified ?
                                        <span onClick={showAllProducts} className={`cursor-pointer mb-8 sm:mr-8 
                                            ${globalStyles.textBig} ${globalStyles.borderBottomHover}`}>
                                            See more...
                                        </span> : null
                                }
                            </div>
                            : ''
                    }

                    {
                        productsUi && productsUi.length > 0 ?
                            <div className="flex justify-center flex-wrap">
                                {productsUi}
                            </div>

                            :
                            <span className={`mt-10 sm:ml-8 cursor-default ${globalStyles.textBig}`}>
                                No products for this category at the moment.
                            </span>
                    }
                </div>
            }
        </React.Fragment>
    );
}

export default CategoryProducts;