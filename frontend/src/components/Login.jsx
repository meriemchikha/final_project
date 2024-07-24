/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from "react";

import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import { UserContext } from "../context/userContext";
import ModalLogOut from "../modal/ModalLogOut";

export default function Login() {
  const { user, setUser, updateToken, token } = useContext(UserContext);
  console.info("user from Login", user);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    fetch("http://localhost:3310/api/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("res from Login", res);
        updateToken(res);
        setUser({});
        navigate("/");
      })
      .catch((err) => console.info(err));
    setShowModal(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {user.message === "isLogged" ? (
        <>
          <div className=" absolute z-20">
            <ModalLogOut
              show={showModal}
              handleClick={handleClick}
              handleCancel={handleCancel}
            />
          </div>
          <div className=" gap-8  items-center hidden md:flex">
            <Link to="/myProfile">Mon profil</Link>

            <button
              className="bg-transparent border-none flex gap-8 items-center"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <IoMdLogOut className="" />
            </button>
          </div>
        </>
      ) : (
        <ul className="hidden md:flex gap-8 ">
          <button>
            <PiShoppingCartLight size={24} />
          </button>
          <Link to="/inscrire">
            <GoPerson size={24} />
          </Link>
        </ul>
      )}
    </>
  );
}
