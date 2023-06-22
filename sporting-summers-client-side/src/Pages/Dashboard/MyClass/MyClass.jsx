import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useClass from "../../../hooks/useClass";
import { Link } from "react-router-dom";

const MyClass = () => {
  const [classes, refetch] = useClass();
  
  // eslint-disable-next-line no-unused-vars
  const handleDelete = myClass => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              fetch(`https://sporting-summers-sever-side.vercel.app/classes/${myClass._id}`, {
                  method: 'DELETE'
              })
                  .then(res => res.json())
                  .then(data => {
                      if (data.deletedCount > 0) {
                          refetch();
                          Swal.fire(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                          )
                      }
                  })
          }
      })
  }

  return (
    <div className="w-full">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Items: {classes.length}</h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Class Image</th>
              <th>Price</th>
              <th>Total Enrolled</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((myClass, index) => (
              <tr key={myClass._id}>
                <td>{index + 1}</td>
                <td className=" w-64 ">{myClass.className}</td>
                <td>
                  <div className=" w-16 ">
                    <img
                      src={myClass.classImage}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>${myClass.price}</td>
                <td>0</td>
                <td>{myClass.status}</td>
                <td><p className=" text-red-600" hidden={myClass.status==="approved" }>{myClass.feedBack}</p></td>
                <td className=" flex">
                  <button onClick={() => handleDelete(myClass)} className="p-1 mr-2 rounded bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                  <Link to={`/dashboard/update/${myClass._id}`} className="p-1 rounded bg-blue-500  text-white"><FaEdit></FaEdit></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
