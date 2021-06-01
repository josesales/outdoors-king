import React from 'react';
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom';
import globalStyles from '../globalStyles';

const CartIcon = () => {

    const itemsNumber = 809;

    return (
        <Link className='flex flex-none' to='/checkout'>
            <div className="relative">

                <img title={itemsNumber && itemsNumber > 0 ? `${itemsNumber} Products in your Cart.` : 'Your Cart is Empty.'}
                    src={cart} alt="Your Cart" className="w-10 h-6 sm:w-20 sm:h-16" />
                {
                    itemsNumber && itemsNumber > 0 ?
                        <span title={`${itemsNumber} Products in your Cart.`}
                            className={`p-1 absolute text-white bg-red-500
                            flex rounded-full items-center justify-center
                            bottom-5 left-3 sm:bottom-14 sm:left-7
                            h-6 w-6 sm:h-11 sm:w-11 
                            text-sm sm:${globalStyles.textDefault}`}>{itemsNumber}</span>
                        : null

                }
            </div>
        </Link>
    );
}

export default CartIcon;