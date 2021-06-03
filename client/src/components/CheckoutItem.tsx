import React from 'react';
import globalStyles from '../globalStyles';
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import CartItem from '../interfaces/cartItem';
import HTML_ENTITIES from '../utils/htmlEntities';

const CheckoutItem = ({ cartItem }: { cartItem: CartItem }) => {

    const { item, quantity } = cartItem;

    const removeItem = () => {

    }

    const addItem = () => {

    }

    const clearItem = () => {

    }

    return (
        <div className={`${globalStyles.checkout.content.container}`}>

            <div className={`${globalStyles.checkout.default}`}>
                <img src={item?.image} alt='item' className={`${globalStyles.checkout.content.image}`} />
            </div>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.big}`}>{item?.name}</span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>
                <div className='mr-auto cursor-pointer' onClick={() => removeItem()}>
                    {HTML_ENTITIES.leftArrow}
                </div>
                <span className='cursor-default'>{quantity}</span>
                <div className='ml-auto cursor-pointer' onClick={() => addItem()}>
                    {HTML_ENTITIES.rightArrow}
                </div>
            </span>

            <span className={`${globalStyles.textDefault} ${globalStyles.checkout.default}`}>{item?.price}</span>

            <div className={`${globalStyles.checkout.default}`} onClick={() => clearItem()}>
                <DeleteIcon className="cursor-pointer w-6 h-6  sm:w-10 sm:h-10 fill-current hover:text-red-500" />
            </div>
        </div>
    );
}

export default CheckoutItem;