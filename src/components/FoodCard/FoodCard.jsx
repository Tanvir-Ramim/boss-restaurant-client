import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";



const FoodCard = ({item}) => {
    const {image,price,recipe,name,_id}=item
    const {user}=useContext(AuthContext)
    const location=useLocation()
    const navigate=useNavigate()
    const axiosSecure=useAxiosSecure()
      const [,refetch]=useCart()
    const handleAddToCart=()=>{
       const email=user?.email
       if(user && user.email){
           const carItem={
              menuId:_id,
              image,
              price,
              recipe,
              name,
              email
           }
           axiosSecure.post('/carts',carItem)
            .then(res=>{
                 if(res.data.insertedId){
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch()
                 }
            })
       }else{
        Swal.fire({
          title: "You are not logged In",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login"
        }).then((result) => {
          if (result.isConfirmed) {
              navigate('/login',{state:{from:location}})
          }
        });
       }
    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="bg-slate-900 mr-4 px-4 mt-4 right-0 text-white absolute">${price}</p>
  <div className="card-body flex flex-col items-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
    <button onClick={handleAddToCart} className="btn bg-slate-100 btn-outline border-b-4 border-orange-400 border-0">Add To Cart</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default FoodCard;