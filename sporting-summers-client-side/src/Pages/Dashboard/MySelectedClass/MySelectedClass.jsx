import { FaTrashAlt } from "react-icons/fa";
import useSelectedClass from "../../../hooks/useSelectedClass";
import { GiPayMoney } from "react-icons/gi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MySelectedClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const [SelectedClass, refetch] = useSelectedClass();
  console.log(SelectedClass);

  const handleDelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/selectedClass/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4 text-center">
        Total Selected Class: {SelectedClass.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Image</th>
              <th>Price</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {SelectedClass.map((myClass, index) => (
              <tr key={myClass._id}>
                <th>{index + 1}</th>
                <td>{myClass.myClass.className}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12">
                      <img src={myClass.myClass.classImage} />
                    </div>
                  </div>
                </td>
                <td>{myClass.myClass.price}</td>
                <td className=" text-center">
                  <Link to={`/dashboard/payment/${myClass._id}`}><button className=" btn btn-accent mr-2" >
                    <GiPayMoney></GiPayMoney> Pay Now
                  </button></Link>
                  
                  
                  
                  <button
                    className=" btn btn-error"
                    onClick={() => handleDelet(myClass._id)}
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
