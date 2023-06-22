import { useParams } from "react-router-dom";
import useClass from "../../../hooks/useClass";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateClass = () => {
  const [classes] = useClass();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  console.log(id);
  const foundClass = classes.find((selectClass) => selectClass._id === id);

  const onSubmit = (data) => {
    console.log(data)
    axiosSecure.put(`/update/${id}`,data)
    .then((data) => {
        console.log("update class", data.data);
        if (data.data.modifiedCount > 0) {
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

    

  return (
    <div className="w-full px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-2"
      >
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
            placeholder={foundClass.className}
            disabled
            className="input input-bordered  "
          />
        </div>
        <div className="form-control col-span-3">
          <label className="label">
            <span className="label-text">Class Image</span>
          </label>
          <input
            type="file"
            disabled
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
            placeholder={foundClass.availableSeats}
            className="input input-bordered  "
          />
        </div>
        <div className="form-control  col-span-3">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            defaultValue={foundClass.category}
            disabled
            className="select select-bordered"
          />
        </div>
        <div className="form-control col-span-3">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder={foundClass.price}
            className="input input-bordered  "
          />
        </div>
        <input
          className="btn font-bold text-white mt-4 bg-orange-500"
          type="submit"
          value="Update Class"
        />
      </form>
    </div>
  );
};

export default UpdateClass;
