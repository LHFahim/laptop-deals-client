import React from "react";
import "./Slider.css";

const Slider = () => {
  const sliderText = <></>;
  return (
    <div className="carousel lg:w-7/12 lg:mx-auto my-5 md:my-8 lg:my-12 rounded-xl">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="gradient">
          <img
            src="https://i.ibb.co/ZGZ6qZG/20221124-220953.png"
            className="w-full"
            alt=""
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 text-center top-1/2">
          {sliderText}
        </div>
        <div className="absolute hidden lg:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle btn-lg   ">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle btn-lg   ">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <div className="gradient">
          <img
            src="https://i.ibb.co/qMdPnjL/20221124-221018.png"
            className="w-full"
            alt=""
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 text-center top-1/2">
          {sliderText}
        </div>
        <div className="absolute hidden lg:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle btn-lg   ">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle btn-lg   ">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <div className="gradient">
          <img
            src="https://i.ibb.co/nPmwHJC/20221124-221101.jpg"
            className="w-full"
            alt=""
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 text-center top-1/2">
          {sliderText}
        </div>
        <div className="absolute hidden lg:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle btn-lg    ">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle btn-lg   ">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <div className="gradient">
          <img
            src="https://i.ibb.co/HXJTvLv/20221124-221146.jpg"
            className="w-full"
            alt=""
          />
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 text-center top-1/2">
          {sliderText}
        </div>
        <div className="absolute hidden lg:flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle btn-lg   ">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle btn-lg   ">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
