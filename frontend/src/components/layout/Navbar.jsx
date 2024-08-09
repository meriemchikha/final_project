import React, { useEffect, useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import logo1 from "../../assets/logo1.png";
import SearchBar from "../SearchBar";
import CategoryList from "./CategoryList";
import { useCart } from "../../context/cartContext";
import { UserContext } from "../../context/userContext"; // Importation du contexte utilisateur
import Login from "../Login"; // Importation du composant Login
import "./navbar.css";

export default function Navbar() {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [categoryListVisible, setCategoryListVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const { cartCount } = useCart();
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(UserContext); // Récupérer l'utilisateur du contexte

  // eslint-disable-next-line no-unused-vars
  const [menuItems, setMenuItems] = useState([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Category", path: "/category" },
    { name: "Contact", path: "/contact" },
  ]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/category`)
      .then((res) => res.json())
      .then((res) => setCategory(res))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleCategoryMouseEnter = (categoryName) => {
    setActiveCategory(categoryName);
    setCategoryListVisible(true);
  };

  const handleCategoryMouseLeave = () => {
    setActiveCategory(null);
    setCategoryListVisible(false);
  };

  return (
    <nav className="w-full lg:pb-8 flex flex-col justify-center items-center lg:relative sticky top-0 z-50 lg:bg-transparent bg-white">
      <div className="container mx-auto lg:w-full">
        <div className="md:flex items-center justify-between border-b border-[#e8e3da] lg:w-4/5 w-full mx-auto py-8">
          <Link to="/">
            <img src={logo1} alt="Logo" width={180} />
          </Link>
          <span className="flex items-center gap-8">
            {dropDownVisible ? (
              <MdClose
                onClick={toggleDropDown}
                className="lg:hidden text-[22px] cursor-pointer"
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleDropDown}
                className="lg:hidden text-[22px] cursor-pointer"
              />
            )}
            <SearchBar />
            <div className="nav-login-cart">
              <Link to="/cart">
                <PiShoppingCartLight size={30} />
              </Link>
              <div className="nav-cart-count">{cartCount}</div>
              <Link to="/wishlist">
                <div>
                  <AiOutlineHeart size={30} />
                </div>
              </Link>
            </div>
            <Login /> {/* mon composant Login */}
          </span>
        </div>
        <div className="lg:w-full mx-auto h-full lg:flex hidden justify-center gap-16 items-center pt-4">
          <ul className="flex items-center xl:gap-14 gap-x-4">
            {menuItems.map((item) =>
              item.name === "Category" ? (
                <li
                  key={item.name}
                  onMouseEnter={() => handleCategoryMouseEnter(item.name)}
                  onMouseLeave={handleCategoryMouseLeave}
                  className="relative leading-normal no-underline text-2xl hover:text-main"
                >
                  <Link to={item.path}>{item.name}</Link>
                  {categoryListVisible && activeCategory === "Category" && (
                    <CategoryList categories={category} />
                  )}
                </li>
              ) : (
                <li
                  key={item.name}
                  className="leading-normal no-underline text-2xl hover:text-main"
                >
                  <Link to={item.path}>{item.name}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        {dropDownVisible && (
          <div className="lg:hidden w-full h-full px-6 fixed top-44 bg-white transition-all">
            <div className="w-full flex flex-col items-baseline gap-4">
              <ul className="flex flex-col justify-center w-full">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-2xl text-[15px] border-0 border-b border-[#ffffff1a] border-solid"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
