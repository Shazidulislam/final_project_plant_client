import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import "./checkoutForm.css"
import {BarLoader} from "react-spinners"
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const CheckoutForm = ({totalPrice , closeModal , orderData}) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cardError , setCardError] = useState(null);
    const [cardProssesing , setCardProssesing] =useState(false);
    const [clientSecret , setClientSecret] = useState("");
    const {user} = useAuth()

    useEffect(()=>{
         const getClientSecret=async()=>{
              const {data} = await axiosSecure.post('/create-payment-intent' , {
                quantity:orderData?.quantity,
                plantId:orderData?.plantId
              })
             setClientSecret(data?.secret)
         }
         getClientSecret()
    },[axiosSecure , orderData])

   const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setCardProssesing(true)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
     
      setCardError(error.message)
     setCardProssesing(false)
     return

    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError(null)
    }

    const result =  await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
        card,
        billing_details: {
        name:user?.displayName,
        email:user?.email,
    },
  },
})

  if(result?.error){
    setCardError(result?.error?.message)
    return 
  }
  if(result?.paymentIntent?.status === "succeeded" ){
    // save ordrer data in db
    orderData.transactionId = result?.paymentIntent?.id
    // console.log( orderData.transactionId)
    try{
          const {data} = await axiosSecure.post("/orders" , orderData)
          console.log(data)
          if(data?.acknowledged){
            toast.success("Order successfully!")
          }
    }
    catch(err){
        setCardError(err?.message)
    }
    finally{
        setCardError(null)
        setCardProssesing(false)
        closeModal()
    }
    
    //update product quantity in db from plant collection

  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {
        cardError && <p className='text-red-500 pb-6'>{cardError}</p>
      }
    <div className='flex justify-between items-center'>
          <button type="submit" 
            className='bg-lime-500
             px-8 py-2 rounded 
             cursor-pointer
              text-white' 
              disabled={!stripe || cardProssesing}>
              {
                cardProssesing ?  <BarLoader/> : `Pay ${totalPrice}$ `
              }
          </button>
          <button onClick={closeModal} className='px-8 py-2 bg-red-800 cursor-pointer rounded text-white'>
               Cancel     
          </button>
    </div>
    </form>
  );
};

export default CheckoutForm;