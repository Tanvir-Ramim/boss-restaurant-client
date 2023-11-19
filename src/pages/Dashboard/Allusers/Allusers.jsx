import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const Allusers = () => {
     const axiosSecure=useAxiosSecure()
    const {data:users=[],refetch}=useQuery({
         queryKey:['users'],
         queryFn: async ()=>{
             const res=await axiosSecure.get('/users')
             return res.data  
         }
    })
    
     const handleDelete=(user)=>{
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
         
          axiosSecure.delete(`/users/${user._id}`)
          .then(res=>{
                if(res.data.deletedCount>0){
               Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
                }
          })
          }
        });
  }

        const handleMakeAdmin=(user)=>{
           axiosSecure.patch(`/users/admin/${user._id}`)
           .then(res=>{
                if(res.data.modifiedCount>0){
                  refetch()
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })

                }
           })
        }


    return (
        <div>
            <div className="flex justify-evenly py-4">
             <h1 className="text-3xl">All users</h1>
             <h1  className="text-3xl">Total users {users.length}</h1>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=><tr key={user.user}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
             {
              user.role==='admin'? 'Admin': <button  onClick={()=>handleMakeAdmin(user)} className="btn bg-orange-500 btn-lg">
              <FaUsers className="text-white text-xl"></FaUsers>
            </button>
             }
              </td>
              <th>
              <button onClick={()=>handleDelete(user)} className="btn btn-ghost btn-lg">
                <FaTrash className="text-red-600"></FaTrash>
              </button>
            </th>
            
          </tr> )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Allusers;