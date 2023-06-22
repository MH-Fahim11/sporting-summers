import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const { user } = useAuth();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.classImage[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { className, availableSeats, price, category } = data;
          const newClass = {
            className,
            classImage: imgURL,
            instructorName: user?.displayName,
            instructorEmail: user?.email,
            availableSeats: parseFloat(availableSeats),
            price: parseFloat(price),
            category,
            status: "pending",
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            console.log("new class", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-2">
        <div className="form-control col-span-3 ">
          <label className="label">
            <span className="label-text font-semibold">Instructor Name</span>
          </label>
          <input
            type="text"
            placeholder={user?.displayName}
            disabled
            className="input input-bordered  "
          />
        </div>
        <div className="form-control col-span-3">
          <label className="label">
            <span className="label-text font-semibold">Instructor Email</span>
          </label>
          <input
            type="text"
            placeholder={user?.email}
            disabled
            className="input input-bordered  "
          />
        </div>
        <div className="form-control col-span-6">
          <label className="label">
            <span className="label-text font-semibold">Class Name</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("className", { required: true, maxLength: 120 })}
            className="input input-bordered  "
          />
        </div>
        <div className="form-control col-span-3">
          <label className="label">
            <span className="label-text">Class Image</span>
          </label>
          <input
            type="file"
            {...register("classImage", { required: true })}
            className="file-input file-input-bordered  "
          />
        </div>

        <div className="form-control col-span-3">
          <label className="label">
            <span className="label-text font-semibold">Available Seats</span>
          </label>
          <input
            type="number"
            {...register("availableSeats", { required: true })}
            placeholder="Type here"
            className="input input-bordered  "
          />
        </div>

        
          <div className="form-control  col-span-3">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option>Football</option>
              <option>Cricket</option>
              <option>Badminton</option>
            </select>
          </div>
          <div className="form-control col-span-3">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered  "
            />
          </div>
        <input className="btn font-bold text-white mt-4 bg-orange-500" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;
