/* eslint-disable react/prop-types */
import React from "react";
import "./ModalUpdate.css";
import { FcOk } from "react-icons/fc";

export default function Modal({ message, show }) {
  return (
    <div
      className={`modal-notification ${
        show ? "slide-left" : ""
      } flex items-center fixed w-72 h-36 bottom-2.5 right-[-90px] bg-gold rounded-lg p-4`}
    >
      <FcOk className=" w-16" /> <p className="ml-2">{message}</p>
    </div>
  );
}
