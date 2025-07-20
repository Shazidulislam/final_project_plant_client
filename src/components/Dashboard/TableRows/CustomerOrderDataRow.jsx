import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
const CustomerOrderDataRow = ({order}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
    
// {
//     "_id": "687b6a677c2a685127fed489",
//     "seller": {
//         "name": "shazidul islam",
//         "email": "shazidulislam591@gmail.com",
//         "image": "https://lh3.googleusercontent.com/a/ACg8ocIw5ey3HjzPABsRooZOJ3YwcC-SXkBk46y-rPA8it_WHrW3eA=s96-c"
//     },
//     "plantId": "687b69617c2a685127fed488",
//     "quantity": 189,
//     "price": 11529,
//     "plantName": "Sylvia Noel",
//     "plantCategory": "Indoor",
//     "plantImage": "https://i.ibb.co/cc1SZ3Xm/small-green-plant-is-placed-on-woven-rug-in-living-room-photo.jpg",
//     "customar": {
//         "name": "shazidul islam",
//         "email": "shazidulislam91@gmail.com",
//         "image": "https://i.ibb.co/WNWSBrJZ/images-2.jpg"
//     },
//     "transactionId": "pi_3RmbOCIJV0XTBdMJ0ZLimcGg"
// }
 const {plantName ,quantity ,plantCategory , price  , status   ,plantImage} = order||{}
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={plantImage}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantCategory}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status ? status:"pending"}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default CustomerOrderDataRow
