import React from 'react';
import globalStyles from '../globalStyles';
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { CartProduct } from '../interfaces/models/cart';
import HTML_ENTITIES from '../utils/htmlEntities';
import { useAppDispatch } from '../redux/hooks';
import { addProduct, cleanProduct, removeProduct } from '../redux/cart/cartReducer';

const CheckoutProduct = ({ cartProduct }: { cartProduct: CartProduct }) => {

    const { product, quantity } = cartProduct;

    const dispatch = useAppDispatch();

    const removeProductClick = () => {
        dispatch(removeProduct(product!));
    }

    const addProductClick = () => {
        dispatch(addProduct(product!));
    }

    const cleanProductClick = () => {
        dispatch(cleanProduct(product!));
    }

    return (
        <div className={`${globalStyles.checkout.content.container}`}>

            <div className={`${globalStyles.checkout.default}`}>
                {
                    product?.image ?
                        <img src={product.image.toString()} alt='item' className={`${globalStyles.checkout.content.image}`} />
                        : ''
                }
            </div>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.big}`}>{product?.name}</span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>
                <div className='mr-auto cursor-pointer' onClick={() => removeProductClick()}>
                    {HTML_ENTITIES.leftArrow}
                </div>
                <span className='cursor-default'>{quantity}</span>
                <div className='ml-auto cursor-pointer' onClick={() => addProductClick()}>
                    {HTML_ENTITIES.rightArrow}
                </div>
            </span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>{product?.price}</span>

            <div className={`${globalStyles.checkout.default}`} onClick={() => cleanProductClick()}>
                <DeleteIcon className="cursor-pointer w-6 h-6  sm:w-10 sm:h-10 fill-current hover:text-red-500" />
            </div>
        </div>
    );
}

export default CheckoutProduct;