import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  // eslint-disable-next-line no-unused-vars
  let key = "";
  const handleUpdateUsers = (user, key) => {
    axiosSecure.patch(`users/setRole/${user._id}?key=${key}`).then((data) => {
      console.log(data);
      if (data.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an ${key} Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4 text-center">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Role</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.img}/>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className=" text-center">
                  <button
                    onClick={() =>
                      handleUpdateUsers(user, (key = "instructor"))
                    }
                    className="btn p-2 bg-blue-600 text-white mx-3"
                    disabled={
                      user.role === "instructor" || user.role === "admin"
                    }
                  >
                    Make instructor
                  </button>
                  <button
                    onClick={() => handleUpdateUsers(user, (key = "admin"))}
                    className="btn p-2  bg-red-600  text-white"
                    disabled={user.role === "admin"}
                  >
                    Make Admin
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

export default ManageUsers;
