import React from 'react';
import globalStyles from '../globalStyles';
import Product from '../interfaces/models/product';
import { addProduct } from '../redux/cart/cartReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { removeProduct } from '../redux/product/productAsyncActions';
import { useHistory } from 'react-router-dom';

const CategoryProduct = ({ product }: { product: Product, minified?: boolean }) => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const token = useAppSelector(state => state.user.token);

    const onAddToCartClick = () => {
        dispatch(addProduct(product));
    }

    const onDeleteProductClick = async () => {

        if (window.confirm("Are you sure you want to Delete this Product?")) {
            dispatch(removeProduct(product.id!, token!));
        }
    }

    const onEditProductClick = () => {
        history.push('/product', { product })
    }
    
    const onProductClick = () => {
        history.push('/productDetails', { product })
    }

    return (

        <React.Fragment>
            {
                product ?

                    <div className="flex flex-col items-center flex-none rounded-3xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-10 p-5 ml-4 mr-4 bg-indigo-100 sm:bg-indigo-100 lg:bg-white hover:bg-indigo-100">

                        {
                            token ?

                                <div className="mb-8 w-full flex justify-end items-center">

                                    <div title="Edit Product" className={`${globalStyles.checkout.default}`} onClick={onEditProductClick}>
                                        <EditIcon className="cursor-pointer w-6 h-6  sm:w-8 sm:h-8 fill-current" />
                                    </div>

                                    <div title="Delete Product" className={`${globalStyles.checkout.default}`} onClick={onDeleteProductClick}>
                                        <DeleteIcon className="cursor-pointer w-6 h-6  sm:w-8 sm:h-8 fill-current" />
                                    </div>
                                </div>

                                : null
                        }

                        <span onClick={onProductClick} className={`cursor-pointer capitalize mb-5 ${globalStyles.textDefault} ${globalStyles.borderBottomHover}`}>
                            {product.name}
                        </span>

                        {
                            product.image ?
                                <img onClick={onProductClick} src={product.image.toString()} alt="Product"
                                    className={`cursor-pointer w-32 h-28 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-64 xl:h-64 flex-none`} />
                                : ''
                        }

                        <div className="w-full flex flex-col justify-center items-center">

                            <span className={`flex-initial mt-5 cursor-default ${globalStyles.textDefault}`}>
                                $ {product.price}
                            </span>

                            <span onClick={onAddToCartClick}
                                className={`mt-2 cursor-pointer ${globalStyles.borderBottomHover} ${globalStyles.textDefault}`}>
                                Add to Cart
                            </span>
                        </div>
                    </div>

                    : null

            }
        </React.Fragment>
    );
}

export default CategoryProduct;