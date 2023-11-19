import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
      const {googleSignIn}= useContext(AuthContext)
      const axiosPublic=useAxiosPublic()
      const navigate= useNavigate()
       const handleGoogleSignIn=()=>{
             googleSignIn()
             .then(result=>{
                  const  userInfo={
                    email: result.user?.email,
                    name: result.user?.displayName 
                  }
                  axiosPublic.post('/users',userInfo)
                  .then(()=>{
                      navigate('/')
                  })
             })
       }
    return (
        <div>
            <div>
               <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle></FaGoogle>
                 Google
                </button> 
            </div>
        </div>
    );
};

export default SocialLogin;