import React from "react";
import StripeCheckout, { Token } from 'react-stripe-checkout'
import globalStyles from "../globalStyles";
import logo from '../assets/logo.png';
import { sendRequest } from "../graphql/request-sender";
import { checkoutMutation } from "../graphql/checkoutGraphql";
import { useAppDispatch } from "../redux/hooks";
import { displayMessage } from "../redux/message/messageReducer";
import { cleanCart } from "../redux/cart/cartReducer";

const StripeCheckoutButton = ({ price }: { price: number }) => {

    const priceForStripe = price * 100; // stripes processes the payment in cents

    const publishableKey = 'pk_test_51HXn1iJs7qXhVWY5bLaO8f6RubSOTCQnLLzoUYGYMoyvakuPkW7aN66ywxVLmm1ox6qbKOJZfYSdB2OyvLL3WfCz00l5Aa8WEU';

    const dispatch = useAppDispatch();

    const onToken = (token: Token) => {

        const checkout = async () => {
            try {

                await sendRequest(checkoutMutation, {
                    checkoutInput: {
                        tokenId: token.id,
                        amount: priceForStripe
                    }
                });
                dispatch(cleanCart());
                dispatch(displayMessage({ type: 'success', message: 'Payment done successfully. Thank you for your purchase!' }));
            } catch (error) {
                dispatch(displayMessage({ type: 'error', message: error.message }));
            }
        }

        checkout();

        // fetch('payment', {
        //     method: 'post',
        //     body: JSON.stringify({
        //         amount: priceForStripe,
        //         token: token
        //     })
        // }).then(response => {
        //     alert('Payment Successful');
        // }).catch(error => {
        //     console.log('Payment error: ', JSON.parse(error));
        //     alert('There was an issue with your payment. Please make sure you use the provided credit card');
        // });
    }

    return (
        <div className={`${globalStyles.textBig}`}>
            <StripeCheckout
                label='Checkout'
                name='Outdoors King'
                billingAddress
                shippingAddress
                image={logo}
                description={`Your total is $${price.toFixed(2)}`}
                amount={priceForStripe}
                panelLabel='Checkout'
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>
    );
}

export default StripeCheckoutButton;