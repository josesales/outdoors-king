import React from 'react';
import globalStyles from '../globalStyles';
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
        <div className={`w-full sm:w-11/12 md:w-9/12 flex justify-center items-center mb-2 mt-2`}>

            <div className='w-2/12 flex justify-center'>
                <img src={item?.image} alt='item' className='w-full sm:w-9/12 md:w-8/12 xl:w-5/12' />
            </div>

            <span className={`${globalStyles.textDefault} w-4/12 flex justify-center cursor-default`}>{item?.name}</span>

            <span className={`${globalStyles.textDefault} w-2/12 flex justify-center`}>
                <div className='mr-auto cursor-pointer' onClick={() => removeItem()}>
                    {HTML_ENTITIES.leftArrow}
                </div>
                <span className='cursor-default'>{quantity}</span>
                <div className='ml-auto cursor-pointer' onClick={() => addItem()}>
                    {HTML_ENTITIES.rightArrow}
                </div>
            </span>

            <span className={`${globalStyles.textDefault} w-2/12 flex justify-center cursor-default`}>{item?.price}</span>

            <div className={`${globalStyles.textBig} w-2/12 flex justify-center`} onClick={() => clearItem()}>
                <span className="cursor-pointer hover:text-red-500">
                    {HTML_ENTITIES.clean}
                </span>
            </div>
        </div>
    );
}

export default CheckoutItem;