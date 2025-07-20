// import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole=()=>{
    const {user , loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    // const [role , setRole] = useState(null)
    // const [isRoleLoading , setIsRoleLoading] = useState(true)

     const {data:role , isLoading:isRoleLoading  } = useQuery({
        queryKey:["role" , user?.email] ,
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
           const {data} = await axiosSecure(`/user-role/${user?.email}`)
           return data
        }
      })
      
    // useEffect(()=>{
    //       const fetchUserRole = async () =>{
    //         if(!user) return setIsRoleLoading(false)
    //          try{
    //          const {data} = await axiosSecure(`/user-role/${user?.email}`)
    //         console.log(data)
    //         setRole(data?.role)
                      
    //         }catch(err){
    //           console.log(err)
    //         }
    //         finally{
    //          setIsRoleLoading(false)
    //         } 
    //     }
    //     fetchUserRole()
      
    // },[axiosSecure ,user , loading])
    return [role?.role , isRoleLoading]
}

export default useRole;