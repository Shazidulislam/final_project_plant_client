import axios from "axios"

export const imageUpload = async imageData =>{
     // put raw image data informData
    const imageFromData = new FormData()
    imageFromData.append('image' , imageData)
     //upload image in img server using post request
     const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY}` 
      ,  imageFromData
    )
    return  data?.data?.display_url
}