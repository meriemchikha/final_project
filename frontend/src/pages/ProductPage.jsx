/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { HiHeart, HiOutlineShoppingBag } from "react-icons/hi";
import img from "../assets/img.jpg";

export default function ProductPage() {
  const [active, setActive] = useState("Skin Care");
  return (
    <div className=" bg-main_dark">
      <div className=" xl:w-4/5 max-w[1400] px-6 mx-auto py-8">
        <div data-aos="fade-down" data-aos-duration="3000">
          <h2 className=" text-4xl text-white font-semibold py-6">Products</h2>
          <div className=" flex lg:flex-row flex-col items-center justify-between pt-12 pb-6">
            <div className=" flex items-center">
              <span className=" flex flex-wrap items-center gap-8">
                <p
                  className={` hover:text-color1 cursor-pointer ${
                    active === "Skin Care" ? "text-color1" : "text-white"
                  }`}
                  onClick={() => setActive("Skin Care")}
                >
                  Skin Care
                </p>
                <p
                  className={` hover:text-color1 cursor-pointer ${
                    active === "Lipsticks" ? "text-color1" : "text-white"
                  }`}
                  onClick={() => setActive("Lipsticks")}
                >
                  Lipsticks
                </p>
                <p
                  className={` hover:text-color1 cursor-pointer ${
                    active === "Makeup" ? "text-color1" : "text-white"
                  }`}
                  onClick={() => setActive("Makeup")}
                >
                  Makeup
                </p>
                <p
                  className={` hover:text-color1 cursor-pointer ${
                    active === "Nail && Wax" ? "text-color1" : "text-white"
                  }`}
                  onClick={() => setActive("Nail && Wax")}
                >
                  Nail && Wax
                </p>
              </span>
            </div>
          </div>
          <div>
            <div>
              <img src={img} alt="" width={250} />
            </div>
            <p>
              Gommage visage <HiHeart />
            </p>
            <div>
              <button>
                <HiOutlineShoppingBag />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
