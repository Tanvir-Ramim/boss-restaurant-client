import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../components/hooks/useAxiosSecure";
import useAxiosPublic from "../../../../components/hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { register, handleSubmit ,reset} = useForm();
    const axiosPublic=useAxiosPublic()
    const {name, category, recipe, price, _id} = useLoaderData();

    const axiosSecure= useAxiosSecure()
  const onSubmit = async (data) => {
     const imageFile={image: data.image[0]}
     const res=await axiosPublic.post(image_hosting_api, imageFile, {
      headers:{
         'content-type': 'multipart/form-data'
      }
     })
     if(res.data.success){
          const menuItems={
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
          }
          const menuRes=await axiosSecure.patch(`/menu/${_id}`,menuItems)
          console.log(menuRes.data)
          if(menuRes.data.modifiedCount>0){
            // show
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is update to the menu`,
              showConfirmButton: false,
              timer: 1500
            });
          }
     }
  
  }
    return (
        <div>
            <SectionTitle heading='Refresh info' subHeading='Update an Item'></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;