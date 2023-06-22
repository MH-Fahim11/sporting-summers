import useEnrolled from "../../../hooks/useEnrolled";


const PaymentHistory = () => {
    const [enrolled ] = useEnrolled()

    return (
        <div className="w-full">
      <h3 className="text-3xl font-semibold my-4 text-center">
        Total Paid Class: {enrolled.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Paid Amount</th>
              <th>Transaction Id</th>
              <th>Payment Date</th>
              <th className=" text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((myPayment, index) => (
              <tr key={myPayment._id}>
                <th>{index + 1}</th>
                <td>{myPayment.itemNames}</td>
                <td>
                {myPayment.price}
                </td>
                
                <td>
                {myPayment.transactionId}
                </td>
                
                <td>{myPayment.date}</td>
                
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

export default PaymentHistory;