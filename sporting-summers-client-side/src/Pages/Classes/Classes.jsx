import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    let [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [isInstructor] = useInstructor()
  const [isAdmin ]= useAdmin()

  useEffect(() => {
    fetch("https://sporting-summers-sever-side.vercel.app/PublicClasses")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data)
        setLoading(false)
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
        <h1 className="text-3xl font-bold ">Our Classes </h1>
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
        <div className=" py-10 bg-[#B2EBF2] text-center ">
        <h1 className="text-3xl font-bold ">Our Classes </h1>
        <div className=" grid grid-cols-3 gap-4 mx-5 mt-10 text-left">
          {classes.map((myClass) => (
            <div
              key={myClass._id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  className=" h-60 w-fit"
                  src={myClass.classImage}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title pl-3">{myClass.className}</h2>
                <p className="text-left pl-3 font-semibold"><span className=" font-bold pr-2">Instructor Name:</span> {myClass.instructorName}</p>
                <div className="flex justify-evenly text-center  ">
                  <p className=" m-auto text-left pl-3"><span className=" font-semibold pr-2">Total Enrolled:</span>{myClass.enrolled}</p>
                  <p className=" m-auto text-left pl-3"><span className=" font-semibold pr-2">Available seat:</span>{myClass.availableSeats}</p>
                
                </div>
                <div className="flex justify-end text-center  pt-5">
      
                { 
                user? <button className="btn btn-primary" disabled={isAdmin|| isInstructor || myClass.availableSeats === 0}  onClick={()=>hendelClick(myClass)}>Enroll Now </button>:
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

export default Classes;