/* eslint-disable react/button-has-type */
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import "./profile.css"; // Ensure this file contains your Tailwind CSS imports

export default function Profile() {
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    console.info(e.target);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/users/${user?.user?.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.info(res))
      .catch((error) => console.error(error));
  };

  console.info("user-----> ", user?.user[0].firstname);

  return (
    <div className="main flex h-screen flex-col bg-gray-100 p-8">
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>{user.user[0].firstname}</p>
      </div>
      <div className="flex justify-center">
        <div className="infos flex flex-col space-y-8 w-1/3 bg-white shadow-md rounded-md p-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-gray-700">Name</p>
              <p className="text-gray-900">
                {user?.user?.lastname} {user.user?.firstname}
              </p>
            </div>
            <button
              type="submit"
              onClick={handleChange}
              className="text-xs text-blue-500 cursor-pointer"
            >
              modifier
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-gray-700">Email</p>
              <p className="text-gray-900">{user?.user?.email}</p>
            </div>
            <button
              type="submit"
              onClick={handleChange}
              className="text-xs text-blue-500 cursor-pointer"
            >
              modifier
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-gray-700">Phone</p>
              <p className="text-gray-900">{user?.user?.phone_mobile}</p>
            </div>
            <button className="text-xs text-blue-500 cursor-pointer">
              modifier
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className=" border-2 bg-slate-400 w-28 h-8 rounded-lg hover:bg-slate-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
