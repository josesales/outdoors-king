import React from 'react';
import CheckoutProduct from '../components/CheckoutProduct';
import StripeCheckoutButton from '../components/StripeButton';
import globalStyles from '../globalStyles';
import { useAppSelector } from '../redux/hooks';
import DisplayMessage from '../components/DisplayMessage';

const Checkout = () => {

    const cartProducts = useAppSelector(state => state.cart.currentCart.cartProducts);

    const total = useAppSelector(state => state.cart.totalPrice);

    const { type, message } = useAppSelector(state => state.message);

    return (

        <div className={`${globalStyles.pageContainer}`}>

            {
                type && message ? <DisplayMessage type={type} message={message} /> : null
            }

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

            {cartProducts!.map(cartProduct => (
                <CheckoutProduct key={cartProduct.product!.id} cartProduct={cartProduct} />
            ))}

            <div className={`flex-initial ${globalStyles.textDefault} font-bold mt-4`}>TOTAL: ${total.toFixed(2)}</div>
            
            {
                total && total > 0 ?
                    <div className={`flex-initial ${globalStyles.textBig} mt-4`}>
                        <StripeCheckoutButton price={total} />
                    </div>
                    : ''
            }

            <div className={`flex-initial text-center mt-14 ${globalStyles.textDefault} text-red-500`}>
                This site is just a portfolio/example project. So the purchases are for testing purposes only.
            </div>
            
            <div className={`flex-initial text-center mt-14 ${globalStyles.textDefault} text-red-500`}>
                Please use the following test credit card for payments:
                <br />
                4242424242424242
            </div>
        </div>
    );
}

export default Checkout;