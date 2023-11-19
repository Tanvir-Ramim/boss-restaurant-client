import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase.Confiq";
import useAxiosPublic from "../components/hooks/useAxiosPublic";

 export const AuthContext=createContext(null)
 const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({children}) => {
      const axiosPublic=useAxiosPublic()
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
     

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
     
    const googleSignIn=()=>{
          setLoading(true)
          return signInWithPopup(auth,googleProvider)
    }



      useEffect(()=>{
            const unSubscribe=onAuthStateChanged(auth,currentUser=>{
                  setUser(currentUser)
                  console.log(currentUser)

                  if(currentUser){
                      
                     const userInfo={email:currentUser.email}
                    axiosPublic.post('/jwt',userInfo)
                    .then(res=>{
                        console.log(res)
                          if(res.data.token){
                             localStorage.setItem('access-token',res.data.token)
                          }
                    })   
                  }
                  else{
                    // do something
                    localStorage.removeItem('access-token')
                  }
                  setLoading(false)
            })
            return()=>{
                  return unSubscribe();
            }
      },[])


    const authInfo={
         user,
         loading,
         signIn,
         createUser,
         logOut,
         updateUserProfile,
         googleSignIn

         
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;