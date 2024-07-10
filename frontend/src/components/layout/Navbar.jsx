/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { HiMenuAlt3, HiSearch } from "react-icons/hi";
import { PiShoppingCartLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
// import Login from "../Login";

export default function Navbar() {
  const [dropDown, setDropDown] = useState(false);

  const showDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className=" w-full lg:pb-8 flex flex-col justify-center items-center lg:relative sticky top-0 z-50 lg:bg-transparent bg-white">
      <div className="container mx-auto lg:w-full w-[95%]">
        <div className="flex items-center justify-between border-b border-[#e8e3da] lg:w-4/5 w-full mx-auto py-8">
          <Link to="/">
            <img src={logo1} alt="" width={140} />
          </Link>
          <span className="flex items-center gap-8">
            {dropDown ? (
              <div>
                <MdClose
                  onClick={showDropDown}
                  className=" lg:hidden text-[22px] cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <HiMenuAlt3
                  onClick={showDropDown}
                  className="lg:hidden text-[22px] cursor-pointer"
                />
              </div>
            )}
            <button>
              <HiSearch size={24} />
            </button>
            <button>
              <PiShoppingCartLight size={24} />
            </button>
            <Link to="/inscrire">
              <GoPerson size={24} />
            </Link>
            <button
              type="button"
              className=" lg:block hidden bg-[#C2A74E] text-white text-[10px] font-semibold px-[29px] py-[11px] transition-bg hover:bg-black hover:text-white"
            >
              Btn
            </button>
          </span>
        </div>
        <div className=" lg:w-full mx-auto h-full lg:flex hidden justify-center gap-16 items-center pt-4">
          <ul className=" flex items-center xl:gap-14 gap-x-4 max-lg:hidden">
            <a
              href="a"
              className=" leading-normal no-underline text-lg hover:text-main"
            >
              Home
            </a>
            <a
              href="a"
              className="leading-normal no-underline text-lg hover:text-main"
            >
              Shop
            </a>
            <Link
              to="/products"
              className="leading-normal no-underline text-lg
              hover:text-main"
            >
              Products
            </Link>
            <a
              href="a"
              className="leading-normal no-underline text-lg hover:text-main"
            >
              Contact
            </a>
            <a
              href="a"
              className="leading-normal no-underline text-lg hover:text-main"
            >
              Blog
            </a>
          </ul>
        </div>
        {dropDown && (
          <div className=" lg:hidden w-full h-full px-6 fixed top-44 bg-white transition-all">
            <div className=" w-full flex flex-col items-baseline gap-4">
              <ul className=" flex flex-col justify-center w-full">
                <a
                  href="a"
                  className=" px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid "
                >
                  Shop
                </a>
                <a
                  href="a"
                  className=" px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid "
                >
                  Products
                </a>
                <a
                  href="a"
                  className=" px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid "
                >
                  Contact
                </a>
                <a
                  href="a"
                  className=" px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid "
                >
                  Blog
                </a>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
