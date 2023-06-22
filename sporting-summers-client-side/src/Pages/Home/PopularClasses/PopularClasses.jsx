import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const PopularClasses = () => {
  const [axiosSecure] = useAxiosSecure()
  const [isAdmin ]= useAdmin()
  const [isInstructor] = useInstructor()

  const [AllClasses, setClasses] = useState([]);

  let [loading, setLoading] = useState(true);

  const {user} = useAuth();

 let classes = AllClasses.slice(0,6)
  useEffect(() => {
    fetch("https://sporting-summers-sever-side.vercel.app/PublicClasses?sorted=true")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      });
  }, []);
 const hendelClick =(myClass)=>{
    const data ={email: user.email, myClass: myClass}
    console.log(data)
    axiosSecure.post("/selectedClass", data)
    .then((data) => {
      console.log(data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Class is added!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

 }

  if (loading) {
    return (
      <>
        <div className=" py-10 bg-[#e8f5f7] text-center ">
        <h1 className="text-3xl font-bold ">Most Popular Classes </h1>
        </div>
        <div className=" md:flex justify-center bg-[#e8f5f7] pb-5">
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      </>
    );
  }

  return (
    <div className=" py-10 bg-[#e8f5f7] text-center ">
      <h1 className="text-3xl font-bold ">Most Popular Classes </h1>
      <div className=" md:grid grid-cols-3 gap-4 md:mx-5 mt-10 te">
        {classes.map((myClass) => (
          <div
            key={myClass._id}
            className="card card-compact md:w-96 glass shadow-xl mb-3 md:mb-0"
          >
            <figure>
              <img
                className=" h-60 w-fit"
                src={myClass.classImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{myClass.className}</h2>
              <p className="text-left pl-3 font-semibold"><span className=" font-bold pr-2">Instructor Name:</span> {myClass.instructorName}</p>
              <div className="card-actions justify-end">
              <p className=" m-auto text-left pl-3"><span className=" font-semibold pr-2">Total Enrolled:</span>{myClass.enrolled}</p>
              <p className=" m-auto text-left pl-3"><span className=" font-semibold pr-2">Available seat:</span>{myClass.availableSeats}</p>
                
              </div>
              <div className="card-actions justify-end pt-5">
              
                { 
                user? <button className="btn btn-primary" disabled={isAdmin|| isInstructor || myClass.availableSeats === 0} onClick={()=>hendelClick(myClass)}>Enroll Now </button>:
                <Link className="btn btn-primary" to="/login">Enroll Now</Link>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
