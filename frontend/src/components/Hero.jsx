/* eslint-disable react/button-has-type */
import React from "react";
import { FaPlay } from "react-icons/fa";
import img1 from "../assets/img1.jpg";
import RotatedText from "./RotatedText";

export default function Hero() {
  // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types

  return (
    <div className=" min-h-[70vh]">
      <div className=" bg-[url('/src/assets/bg2.jpg')] bg-no-repeat lg:absolute bg-cover bg-center w-full top-0 h-[830px]">
        <div className=" max-w-[1200px] mx-auto xl:px-0 px-4 lg:mt-72 pt-8 lg:flex items-center">
          <div
            className=" relative lg:w-1/2 z-10"
            data-aos="fade-right"
            data-aos--delay="300"
          >
            <h1 className=" text-textColor font-semibold mb-4">
              Beauté naturelle rayonne
            </h1>
            <h2 className=" uppercase mb-9 lg:text-[70px] font-semibold lg:leading-[70px]">
              Découvrir notre produits
            </h2>
            <button className=" text-xs font-semibold text-white bg-main py-4 px-12 transition-bg hover:bg-black hover:text-white">
              Découvrir plus
            </button>
          </div>
          <div
            className=" lg:mt-0 mt-8"
            data-aos="fade-right"
            data-aos--delay="300"
          >
            <div className=" relative z-10 rounded-[350px] flex items-center justify-center lg:h-[500px] h-[300px]">
              <img
                src={img1}
                alt=" "
                width={400}
                className=" rounded-[450px]  lg:h-full z-10 "
              />

              <div className=" absolute z-10 -left-2 lg:left-4 right-52 bottom-0  md:-bottom-20 lg:block flex justify-center">
                <div className=" bg-white rounded-full relative flex items-center justify-center w-[140px] h-[140px] min-slider-three-left-text ">
                  <RotatedText />
                  <div className=" bg-main text-white rounded-full flex items-center justify-center absolute w-[85px] h-[85px] ">
                    <FaPlay size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
