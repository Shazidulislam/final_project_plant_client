import {  useEffect, useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
const SellerOrderDataRow = ({order , }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure()
  const {plantName ,quantity ,plantCategory , price  , status ,customar , _id } = order||{}
  const [updateStatus , setUpdateStatus ]= useState("")

  console.log(updateStatus ,order?._id )
  
  const {mutate} = useMutation({
    mutationFn:async(status)=>{
         const {data} = await axiosSecure.patch(`/orders/status/${order?._id}` ,status)
         return data
    },
    onSuccess:(data)=>{
      console.log(data)
    },
    onError:(error)=>{
      console.log(error)
    }

  })
//  useEffect(()=>{
//     mutate(updateStatus)
//  },[  mutate ,updateStatus])
  
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customar?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantCategory}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status?status:"Pending"}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
           <select
               value={updateStatus}
               onChange={e=>setUpdateStatus(e.target.value)}
               required
               className='p-1 border-2  border-lime-300 focus:outline-lime-500 text-gray-900 whitespace-no-wrap bg-white'
               name='category'
             >
               <option value='Pending'>Pending</option>
               <option value='In Progress'>Start Processing</option>
               <option value='Delivered'>Deliver</option>
           </select>
          
          {
            status !=="Delivered" && 
            <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
          }
          
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal}  id={_id} />
      </td>
    </tr>
  )
}

export default SellerOrderDataRow
