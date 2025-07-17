import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AddPlant = () => {
  const [upLoading , setUpLoading] = useState(false)
  const [uploadImage , setUploadImage] = useState(null)
  console.log(upLoading)
  const {user}  = useAuth()
  const handleFromSubmit=async(e)=>{
    e.preventDefault()
    const form = e.target
    const name = form?.name?.value;
    const category = form?.category?.value;
    const description = form?.description?.value;
    const price = form?.price?.value;
    const quantity = form?.quantity?.value;
  
    setUpLoading(true)
    try{
      
        
        const plantData = {
          name , 
          category ,
          description ,
          price :parseFloat(price) , 
          quantity :parseInt(quantity),
          image:uploadImage , 
          seller : {
          name:user?.displayName,
          email:user?.email,
          image:user?.photoURL
        }}
        //post plant data
        const {data} = await axios.post(`${import.meta.env?.VITE_API_URL}/add-plant` ,plantData )
        if(data?.acknowledged){
          toast.success("Plant data added successfully! Yeee!")
          form.reset()
        }

    }catch(err){
          console.log(err)
    }
    finally{
       setUpLoading(false)  
       setUploadImage(null)
    }
}

const handleImageUpload= async e =>{
  e.preventDefault()

    const image = e.target?.files[0];
    console.log(image)
  const imageURL= await imageUpload(image)
  setUploadImage(imageURL)
}
  return (
    <div>
      {/* Form */}
      <AddPlantForm 
      handleFromSubmit={handleFromSubmit}
       handleImageUpload={handleImageUpload} 
       upLoading={upLoading}
       uploadImage={uploadImage}/>
    </div>
  )
}

export default AddPlant
