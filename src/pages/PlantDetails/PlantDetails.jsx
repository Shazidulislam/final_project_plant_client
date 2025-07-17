import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { use, useState } from 'react'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../../providers/AuthProvider'

const PlantDetails = () => {
  const plant = useLoaderData()
  let [isOpen, setIsOpen] = useState(false)
  const {user} = use(AuthContext)


  const closeModal = () => {
    setIsOpen(false)
  }
   const {category ,image , name , price , quantity , _id ,seller ,description  } = plant || {}
  return (
    <Container>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading 
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-normal text-neutral-500'
          >
           {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Seller: {seller?.name}</div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller?.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4 
                font-normal
                text-neutral-500 
              '
            >
              Quantity: {quantity} Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            
            <div>
              <Button onClick={() => setIsOpen(true)} label={user?.email ? "Purchase":"Login to purchase"} disabled={!user}/>
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} plant={plant} />
        </div>
      </div>
    </Container>
  )
}

export default PlantDetails
