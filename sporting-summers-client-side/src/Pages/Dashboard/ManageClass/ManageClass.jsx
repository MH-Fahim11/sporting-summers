import useAllClass from "../../../hooks/useAllClass";
import { FaCheck, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiCancel } from "react-icons/gi";

const ManageClass = () => {
  const [classes, refetch] = useAllClass();
  const [axiosSecure] = useAxiosSecure();
  // eslint-disable-next-line no-unused-vars
  let key = "";
  const handleStatus = (myClass, key) => {
    fetch(`https://sporting-summers-sever-side.vercel.app/update/approved/${myClass._id}?key=${key}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Status Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleFeedBack = async (myClass) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    const data = { feedBack: text };
    axiosSecure.put(`/update/feedback/${myClass._id}`, data).then((data) => {
      console.log("feedback", data.data);
      if (data.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Feedback Send Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="w-full">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Classes: {classes.length}</h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Class Image</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((myClass, index) => (
              <tr key={myClass._id}>
                <td>{index + 1}</td>
                <td>{myClass.className}</td>
                <td>
                  <div className=" w-16 ">
                    <img src={myClass.classImage} alt="Class img" />
                  </div>
                </td>
                <td>{myClass.instructorName}</td>
                <td>{myClass.instructorEmail}</td>
                <td>${myClass.price}</td>
                <td>{myClass.availableSeats}</td>
                <td>{myClass.status}</td>
                {/* onClick={() => handleDelete(myClass)} */}
                <td className=" flex">
                  <div className="tooltip" data-tip="Approve">
                    <button
                      onClick={() => handleStatus(myClass, (key = "approved"))}
                      disabled={myClass.status === "approved" || myClass.status==="denied"}
                      className={
                        myClass.status === "approved" || myClass.status==="denied"
                          ? "bg-gray-400 p-1 rounded text-white mr-1"
                          : "p-1 mr-1 rounded  bg-green-600  text-white"
                      }
                    >
                      <FaCheck></FaCheck>
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Denied">
                    <button
                      onClick={() => handleStatus(myClass, (key = "denied"))}
                      disabled={myClass.status === "denied" || myClass.status === "approved" }
                      className={
                        myClass.status === "denied" || myClass.status === "approved" 
                          ? "bg-gray-400 p-1 rounded text-white mr-1"
                          : "p-1 mr-1 rounded bg-red-600  text-white"
                      }
                    >
                      <GiCancel></GiCancel>
                    </button>
                  </div>

                  <div className="tooltip" data-tip="Feedback">
                    <button
                      onClick={() => handleFeedBack(myClass)}
                      disabled={myClass.status === "approved"}
                      className={
                        myClass.status === "approved"
                          ? " bg-gray-400 p-1 rounded text-white"
                          : "p-1 mr-1 rounded bg-blue-400  text-white"
                      }
                    >
                      <FaEdit></FaEdit>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClass;
