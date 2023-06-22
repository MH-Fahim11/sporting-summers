import useEnrolled from "../../../hooks/useEnrolled";


const MyEnrolledClasses = () => {
const [enrolled ] = useEnrolled()
const SelectedClass = enrolled;

    return (
        <div className="w-full">
      <h3 className="text-3xl font-semibold my-4 text-center">
        Total Enrolled Class: {enrolled.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Image</th>
              <th>Instructor Name</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {SelectedClass.map((myClass, index) => (
              <tr key={myClass._id}>
                <th>{index + 1}</th>
                <td>{myClass.cartItems.myClass.className}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12">
                      <img src={myClass.cartItems.myClass.classImage} />
                    </div>
                  </div>
                </td>
                
                <td>{myClass.cartItems.myClass.instructorName}</td>
                
                <td className=" text-center">
                  
                  
                  
                  <button
                    className=" btn btn-secondary"
                    
                  >
                    View details
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

export default MyEnrolledClasses;