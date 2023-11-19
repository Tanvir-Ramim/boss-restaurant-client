import { useContext } from "react";
import useAdmin from "../components/hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoutes = ({children}) => {
     const {user,loading}=useContext(AuthContext)
    const [isAdmin, isPending]=useAdmin()
    const location = useLocation()

    if(loading || isPending){
        return <progress className="progress w-56"></progress>
   }
   if(user && isAdmin){
        return children
   }
   

   return <Navigate state={{from:location}} replace to='/login'></Navigate>
};

export default AdminRoutes;