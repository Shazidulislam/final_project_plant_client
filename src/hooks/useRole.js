import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole=()=>{
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [role , setRole] = useState(null)
    const [isRoleLoading , setIsRoleLoading] = useState(true)

    useEffect(()=>{
        const fetchUserRole = async () =>{
          const {data} = await axiosSecure(`/user-role/${user?.email}`)
          console.log(data)
           setRole(data?.role)
          setIsRoleLoading(false)
        }
        fetchUserRole()
       
    },[axiosSecure ,user ])
    return [role , isRoleLoading]
}

export default useRole;