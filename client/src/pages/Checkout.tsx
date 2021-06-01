import React from 'react';
import CheckoutItem from '../components/CheckoutItem';
import StripeCheckoutButton from '../components/StripeButton';
import globalStyles from '../globalStyles';
import { cartItems as cartItemsData } from '../testData/cartItem';

const Checkout = () => {

    const cartItems = cartItemsData;

    const total = 99;

    return (

        <div className={`${globalStyles.pageContainer}`}>

            <div className={`w-full sm:w-11/12 md:w-9/12 flex justify-center border-b cursor-default
               ${globalStyles.textDefault}  ${globalStyles.borderBottom}`}>

                <div className='capitalize w-2/12 flex justify-center'>
                    <span></span>
                </div>

                <div className='capitalize w-4/12 flex justify-center'>
                    <span>Product</span>
                </div>

                <div className='capitalize w-2/12 flex justify-center'>
                    <span>Quantity</span>
                </div>

                <div className='capitalize w-2/12 flex justify-center'>
                    <span>Price</span>
                </div>

                <div className='capitalize w-2/12 flex justify-center'>
                    <span>Remove</span>
                </div>
            </div>

            {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}

            <div className={`flex-initial ${globalStyles.textDefault} font-bold mt-4`}>TOTAL: ${total}</div>

            <div className={`flex-initial ${globalStyles.textBig} mt-4`}>
                <StripeCheckoutButton price={total} />
            </div>

            <div className={`flex-initial text-center mt-14 ${globalStyles.textDefault} text-red-500`}>
                Please use the following test credit card for payments:
                <br />
                Test Credit Card
            </div>

        </div>
    );
}

export default Checkout;