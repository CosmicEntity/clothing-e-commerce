import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100;
    const publishableKey = "pk_test_51J7DdsSIylWTNkIzQWs4aGfgRa2hbiKWB1VzKekkhnIm1LHIR3L1mVMem2VDS51MNcjrc3bIzLHn4OCQu3P3rqnA00hCdTzUN2";
    const onToken = token => {
        console.log(token)
        alert("Payment Successful")
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="Clothing-e-Commerce"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz"
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;