import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../Form/CheckoutForm'
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PurchaseModal = ({ closeModal, isOpen , plant ,  fetchPlant}) => {

  const {category  , name , price , quantity , _id , seller ,image  } = plant || {}
  const {user}= useAuth()


  const [selectedQuantity , setSelectedQuantity] = useState(1)
  const [totalPrice , setTolatPrice] = useState(price)
  const [orderData , setOrderData] = useState({
  
    seller,
    plantId :_id,
    quantity:1,
    price:price,
    plantName:name,
    plantCategory:category,
    plantImage:image

  })


  // Total Price Calculation
  const handleQuantuty = value =>{
    const totalQuantity = parseInt(value);
    if(totalQuantity > quantity )
      return toast.error("Sorry! We don't have more product!")

    const calculatedPrice = totalQuantity * price
    setSelectedQuantity(totalQuantity);
    setTolatPrice(calculatedPrice)

    setOrderData(prev=>{
      return{
        ...prev,
        price:calculatedPrice,
        quantity:totalQuantity
      }
    })
  }

    useEffect(()=>{
     setOrderData(prev=>{
          return{
            ...prev,
            customar:{
            name:user?.displayName,
            email:user?.email,
            image:user?.photoURL,
            },
          }
     })

  },[user])

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Plant : {name}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Category: {category}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Customer: {user?.displayName} </p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Price per unit : $ {price}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Available Quantity: {quantity}</p>
            </div>
            <hr className='mt-3' />
            <div>
              <p className='text-sm text-gray-500 font-medium'>Order Info : </p>
              <input type="number"
                min={1} 
                // max={quantity}
               className='px-3 py-1 border-2 rounded shadow-2xl' 
               value={selectedQuantity}
               onChange={e=>handleQuantuty(e.target.value)}
               />

            </div>
             {/* selected quantity */}
            <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Selected Quantity: {selectedQuantity}</p>
            </div>
            {/* total price */}
              <div className='mt-2'>
              <p className='text-sm text-gray-500 font-medium'>Total price : ${totalPrice}</p>
            </div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm totalPrice={totalPrice} 
                  closeModal={closeModal} 
                  orderData={orderData}
                  fetchPlant={fetchPlant}
                   />
                </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
