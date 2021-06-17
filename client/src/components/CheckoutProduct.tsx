import React from 'react';
import globalStyles from '../globalStyles';
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import CartProduct from '../interfaces/models/cartProduct';
import HTML_ENTITIES from '../utils/htmlEntities';

const CheckoutProduct = ({ cartProduct }: { cartProduct: CartProduct }) => {

    const { product, quantity } = cartProduct;

    const removeProduct = () => {

    }

    const addProduct = () => {

    }

    const clearProduct = () => {

    }

    return (
        <div className={`${globalStyles.checkout.content.container}`}>

            <div className={`${globalStyles.checkout.default}`}>
                <img src={product?.image} alt='item' className={`${globalStyles.checkout.content.image}`} />
            </div>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.big}`}>{product?.name}</span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>
                <div className='mr-auto cursor-pointer' onClick={() => removeProduct()}>
                    {HTML_ENTITIES.leftArrow}
                </div>
                <span className='cursor-default'>{quantity}</span>
                <div className='ml-auto cursor-pointer' onClick={() => addProduct()}>
                    {HTML_ENTITIES.rightArrow}
                </div>
            </span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>{product?.price}</span>

            <div className={`${globalStyles.checkout.default}`} onClick={() => clearProduct()}>
                <DeleteIcon className="cursor-pointer w-6 h-6  sm:w-10 sm:h-10 fill-current hover:text-red-500" />
            </div>
        </div>
    );
}

export default CheckoutProduct;