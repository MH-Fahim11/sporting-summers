import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const PopularInstructors = () => {

  const [allInstructors, setInstructors] = useState([]);
  const instructors = allInstructors.slice(0,6) 
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sporting-summers-sever-side.vercel.app/instructors")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data)
        setLoading(false)
      });
  }, []);
  if (loading) {
    return (
      <>
        <div className=" py-10 bg-[#ffd6ca] text-center ">
          <h1 className="text-3xl font-bold ">Most Popular Instructors</h1>
        </div>
        <div className=" md:flex justify-center bg-[#ffa58a] pb-5">
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
    <div className=" py-10 bg-[#fbe5df] text-center ">
      <h1 className="text-3xl font-bold ">Most Popular Instructors </h1>
      <div className=" md:grid grid-cols-3 gap-4 md:mx-5 mt-10 te">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card card-compact md:w-96 glass shadow-xl mb-2 md:mb-0"
          >
            <figure>
              <img
                className=" h-60 w-fit"
                src={instructor.img}
                alt="Shoes"
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

export default PopularInstructors;
