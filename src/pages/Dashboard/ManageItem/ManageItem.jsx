import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useMenu from "../../../components/hooks/useMenu";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItem = () => {
    const[menu, ,refetch ]=useMenu()
    const axiosSecure=useAxiosSecure()
    const handleDeleteItem= (item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(item._id)
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                    if(res.data.deletedCount> 0){
                       refetch()
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `${item.name} has been deleted`,
                          showConfirmButton: false,
                          timer: 1500
                        });
                    }
            }
          }); 
    }
    return (
        <div>
            <SectionTitle heading='Hurry up' subHeading='Manage All items'></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Deleted</th>
      </tr>
    </thead>
    <tbody>
      {
        menu.map((item , index)=> <tr key={item._id}>
            <td>
               {index+1}
            </td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} />
                  </div>
                </div>
                
              </div>
            </td>
            <td>
                    {item.name}
            </td>
            <td >${item.price}</td>
            <td>
           <Link to={`/dashboard/updateItem/${item._id}`}> <button className="btn bg-orange-500 btn-sm">
                <FaEdit  className="text-white text-xl"></FaEdit>
            </button></Link>
            </td>
            <td>
            <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                <FaTrash className="text-red-600"></FaTrash>
              </button>
            </td>
          </tr>)
      }
     
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default ManageItem;