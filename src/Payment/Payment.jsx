import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link , useNavigate } from 'react-router-dom';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Payment.css';
import axios from '../axios';
import {db} from '../firebase';
function Payment() {
    const [{basket,user},dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState(false);
    const [error,setError] = useState(null);

    const [disabled,setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState(true);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        //generate the special stripe secret which allows us to
        //charge a customer
        const getClientSecret = async () => {
            const reponse = await axios({
                method: 'post',
                //Stripe expects the total in a currencies submits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(reponse.data.clientSecret);
        }
        getClientSecret();

    },[basket])

    console.log("The SECRET IS >>>", clientSecret);

    const handleSubmit = async (event) => {
        //do all the fancy stripe stuff ...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(({paymentIntent}) => {
                //paymentItent = payment confirmation

                db.collection('users')
                    .doc(user?.id)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    })

                    
                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                navigate('/orders',{replace: true});
            })
    }
    const handleChange = event => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className="payment__container">
            <h1>Checkout(<Link to="/checkout">{basket?.length} items</Link>)</h1>
            {/* delivery address */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>   
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            {/* Review Items */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className="payment__items">
                    {/* Pass the checkoutProduct to here */}
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>  
            {/* Payment method */}
            <div className="payment__section">
                <div className="payment__title">
                   <h3> 
                    Payment Method
                    </h3> 
                </div>
                <div className="payment__details">
                    {/* Stripe magic will go */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>                                       
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                            <button disabled={processing || disabled || succeeded }>
                                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                        </div>

                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment