import React from "react";
import StripeCheckout, { Token } from 'react-stripe-checkout'
import globalStyles from "../globalStyles";
import logo from '../assets/logo.png';

const StripeCheckoutButton = ({ price }: { price: number }) => {

    const priceForStripe = price * 100; // stripes processes the payment in cents

    const publishableKey = 'pk_test_51HXn1iJs7qXhVWY5bLaO8f6RubSOTCQnLLzoUYGYMoyvakuPkW7aN66ywxVLmm1ox6qbKOJZfYSdB2OyvLL3WfCz00l5Aa8WEU';

    const onToken = (token: Token) => {
        fetch('payment', {
            method: 'post',
            body: JSON.stringify({
                amount: priceForStripe,
                token: token
            })
        }).then(response => {
            alert('Payment Successful');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        });
    }

    return (
        <div className={`${globalStyles.textBig}`}>
            <StripeCheckout
                label='Checkout'
                name='Outdoors King'
                billingAddress
                shippingAddress
                image={logo}
                description={`Your total is ${price}`}
                amount={priceForStripe}
                panelLabel='Checkout'
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>
    );
}

export default StripeCheckoutButton;