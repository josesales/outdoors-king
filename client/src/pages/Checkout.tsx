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

            <div className={`${globalStyles.checkout.header.container} ${globalStyles.textDefault}  ${globalStyles.borderBottom}`}>

                <div className={globalStyles.checkout.default}>
                    <span></span>
                </div>

                <div className={globalStyles.checkout.big}>
                    <span>Product</span>
                </div>

                <div className={globalStyles.checkout.default}>
                    <span>Quantity</span>
                </div>

                <div className={globalStyles.checkout.default}>
                    <span>Price</span>
                </div>

                <div className={globalStyles.checkout.default}>
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