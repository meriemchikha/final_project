/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { UserContext } from "../context/userContext";
import ModalLogOut from "../modal/ModalLogOut";

export default function Login() {
  const { user, setUser, updateToken, token } = useContext(UserContext);
  console.info("user from Login", user);

  const [showModal, setShowModal] = useState(false);
  const [personMenuVisible, setPersonMenuVisible] = useState(false); // État pour gérer la visibilité du menu déroulant
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false); // État pour gérer la souris sur le menu

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    fetch("http://localhost:3310/api/logout", {
      method: "POST", // Assurez-vous que la méthode est POST
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

  const handlePersonMouseEnter = () => {
    setPersonMenuVisible(true);
  };

  const handlePersonMouseLeave = () => {
    setTimeout(() => {
      if (!isMouseOverMenu) {
        setPersonMenuVisible(false);
      }
    }, 200); // Delay to ensure menu doesn't close immediately
  };

  const handleMenuMouseEnter = () => {
    setIsMouseOverMenu(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMouseOverMenu(false);
    setPersonMenuVisible(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {user.message === "isLogged" ? (
        <>
          <div className="absolute z-20">
            <ModalLogOut
              show={showModal}
              handleClick={handleClick}
              handleCancel={handleCancel}
            />
          </div>
          <div className="gap-8 items-center hidden md:flex text-lg">
            <Link to="/Profile">Mon profil</Link>
            <button
              className="bg-transparent border-none flex gap-8 items-center"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <IoMdLogOut />
            </button>
          </div>
        </>
      ) : (
        <div
          className="relative"
          onMouseEnter={handlePersonMouseEnter}
          onMouseLeave={handlePersonMouseLeave}
        >
          <GoPerson size={24} />
          {personMenuVisible && (
            <ul
              className="absolute top-full w-40 mt-2 bg-white border border-gray-200 rounded shadow-lg"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <li className="p-2 hover:bg-gray-100">
                <Link
                  to="/connecter"
                  onClick={() => setPersonMenuVisible(false)}
                >
                  Se connecter
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <Link
                  to="/inscrire"
                  onClick={() => setPersonMenuVisible(false)}
                >
                  S'inscrire
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}
