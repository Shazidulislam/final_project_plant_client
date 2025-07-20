import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const UpdateUserRoleModal =({isOpen , role , setIsOpen , userEmail })=> {
  const [updatedRole , setUpdatedRole] = useState(role)
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  function close() {
    setIsOpen(false)
  }


  const patchMutation = useMutation({
    mutationFn:async (role)=>{
       const {data} = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/user/role/update/${userEmail}` , {role})
       return data
    },
    onSuccess:(data)=>{
     console.log(data)
     setIsOpen(false)
     toast.success("User role update successfully!")
    //  refetch()
    queryClient.invalidateQueries(["users"])
    },
    onError:(error)=>{
     console.log(error)
    }
  })

  const handleUpdate=(e)=>{
   e.preventDefault()
   patchMutation.mutate(updatedRole)

  }

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none shadow-2xl" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              <h2 className='font-bold text-center text-2xl text-[#403f3f]'>
                Update User Role
              </h2>
              </DialogTitle>
                 <form onSubmit={handleUpdate}>
                    <div>
                      <select value={updatedRole} onChange={e=>setUpdatedRole(e.target.value)} name="role" className='px-4 mt-3 py-2 border-2 border-gray-300 bg-white shadow-2xl w-full rounded outline-none' id="">
                         <option value={"customer"} >Customer</option>
                         <option value={"seller"} >Seller</option>
                         <option value={"admin"} >admin</option>
                       </select>
                    </div>
                    <div className='flex justify-between pt-5'>
                        <button type='submit' className='px-6 py-2 bg-lime-600 rounded text-white'>Update</button>
                        <button onClick={close  } type='button' className='px-6 py-2 bg-red-600 rounded text-white'>Cancle</button>
                    </div>
                 </form>
              </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default UpdateUserRoleModal;