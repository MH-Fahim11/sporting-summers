// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper";

import { useEffect, useState } from "react";
const TopSlider = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    fetch("slider.json")
      .then((res) => res.json())
      .then((data) => setSlider(data));
  }, []);

  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {slider.map((item) => (
          <SwiperSlide key={item.key}>
            <div
              className="hero min-h-screen"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="px-16">
                  <h1 className="mb-5 md:text-5xl text-xl font-bold">{item.itemHeader}</h1>
                  <p className="mb-5">
                    {item.itemTitle}
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSlider;
