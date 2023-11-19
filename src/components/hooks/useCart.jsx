import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useCart = () => {
      const axiosSecures=useAxiosSecure();
      const {user}=useContext(AuthContext)
       const {data:cart=[],refetch}=useQuery({
          queryKey:['cart',user?.email],
          queryFn: async()=>{
              const res=await axiosSecures.get(`/carts?email=${user.email}`)
              return res.data
          }
       })
       return [cart,refetch]
};

export default useCart;