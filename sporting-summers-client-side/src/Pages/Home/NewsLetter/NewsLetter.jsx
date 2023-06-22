import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const NewsLetter = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="m-2 rounded-2xl"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80")`,
      }}
    >
      <div className=" hero-overlay bg-opacity-60 p-10 rounded-2xl">
        <div className=" md:flex justify-around text-white font-serif">
          <div data-aos="fade-right">
            <h1 className=" font-bold md:text-3xl text-xl text-orange-100" >Join Our Newsletter</h1>
            <p className="md:ml-4 text-slate-300">We Will send you Newly arrived courses.<br/> Also you will able to add your courses too. </p>
          </div>
          <div className="mt-4 md:mt-0" data-aos="fade-left">
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-bordered"
            />
            <button className="mt-5 md:mt-0 md:ml-2 p-3 font-serif bg-orange-400 rounded-xl text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
