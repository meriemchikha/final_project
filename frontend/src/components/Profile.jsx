/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import "./profile.css"; // Ensure this file contains your Tailwind CSS imports
// eslint-disable-next-line import/order
import { useNavigate } from "react-router-dom";
import ModalUpdate from "../modal/ModalUpdate";

export default function Profile() {
  // eslint-disable-next-line no-unused-vars
  const { user, token } = useContext(UserContext); // Assuming updateUser updates the user state
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_mobile: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        firstname: user.user?.firstname,
        lastname: user.user?.lastname,
        email: user.user?.email,
        phone_mobile: user.user?.phone_mobile,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const storage = [];
    // storage.push(formData);
    const messageInLocalStorage =
      JSON.parse(localStorage.getItem("message")) || [];
    console.info(messageInLocalStorage);
    if (messageInLocalStorage.length) {
      messageInLocalStorage.push(userInfo);
      localStorage.setItem("message", JSON.stringify(messageInLocalStorage));
    } else {
      storage.push(userInfo);
      localStorage.setItem("message", JSON.stringify(storage));
    }
    setMessage(
      "Vos informations ont bien été mises à jour. Vous allez être redirigé vers votre page profil dans un instant."
    );
    setShow(true);
    setTimeout(() => {
      navigate("/Profile");
      setShow(false);
      window.location.reload();
    }, 5000);
  };
  console.info("user======>", user);
  return (
    <div className="main flex h-screen flex-col bg-gray-100 p-8">
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md mb-8">
        <h1 className="text-2xl font-bold">Modifier mon Profil</h1>
        <h1 className="text-xl font-semibold text-gray-800   text-center">
          {user?.user?.lastname} {user?.user?.firstname}
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="infos flex flex-col space-y-8 w-1/3 bg-white shadow-md rounded-md p-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-700">Nom</label>
              <input
                type="text"
                name="lastname"
                value={userInfo.lastname}
                onChange={handleChange}
                className="text-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-700">Prénom</label>
              <input
                type="text"
                name="firstname"
                value={userInfo.firstname}
                onChange={handleChange}
                className="text-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="text-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <label className="text-gray-700">Téléphone</label>
              <input
                type="text"
                name="phone_mobile"
                value={userInfo.phone_mobile}
                onChange={handleChange}
                className="text-gray-900"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className=" border-2 bg-slate-400 w-28 h-8 rounded-lg hover:bg-slate-300"
          >
            Sauvegarder
          </button>
        </div>
        {show && <ModalUpdate message={message} show={show} />}
      </div>
    </div>
  );
}
