import React from "react";
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <div className=" container-full items-center bg-fuchsia-400  h-40 mx-auto py-12 px-8 text-white">
      <div className="text-align md:text-left space-x-4 flex start md:ml-20 justify-center text-sm">
        <p>conditions d'utilisations</p>
        <p>mentions légales</p>
        <p>devenir membre</p>
      </div>
      <div className="ml-3 text-xs md:text-left flex justify-center">
        <FaCopyright />
        <p>Wild Code School °Chikha Meriem° </p>
      </div>
    </div>
  );
}
