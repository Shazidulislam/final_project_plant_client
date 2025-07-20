import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const DeleteModal = ({ closeModal, isOpen , id }) => {
   const axiosSecure = useAxiosSecure()
  const {mutate} = useMutation({
    mutationFn:async()=>{
      const {data} = await axiosSecure.patch(`/orders/status/cancle/${id}`)
      return data
    },
    onSuccess:(data)=>{
      console.log(data)
      toast.success("Hooooo cancle")
    },
    onError:(error)=>{
      console.log(error)
    }
  })
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
              className='text-lg font-medium leading-6 text-gray-900'
            >
              Are you sure?
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                You cannot undo once it&apos;s done!
              </p>
            </div>
            <hr className='mt-8 ' />
            <div className='flex mt-2 justify-around'>
              <button
                type='button' onClick={mutate()}
                className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
              >
                Yes
              </button>
              <button
                type='button'
                className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteModal
