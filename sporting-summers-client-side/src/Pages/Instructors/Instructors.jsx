import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sporting-summers-sever-side.vercel.app/instructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <>
        <div className=" py-10  text-center ">
          <h1 className="text-3xl font-bold ">Our Instructors </h1>
        </div>
        <div className=" md:flex justify-center  pb-5">
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
    <div className=" py-10  text-center ">
      <h1 className="text-3xl font-bold ">Our Instructors </h1>
      <div className=" grid grid-cols-3 gap-4 mx-5 mt-10 te">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className=" h-60 w-fit"
                src={instructor.img}
                alt="instructor"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{instructor.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
