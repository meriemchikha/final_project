/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import QuantityInCart from "../components/cart/QuantityInCart";
import AddToWishlist from "../components/wishlist/AddToWishlist";
import DeleteInCart from "../components/cart/DeleteInCart";

export default function CartPage() {
  const { cart } = useCart();
  const { user } = useContext(UserContext);
  const [CartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.info(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Calculer le prix total
  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const totalCart = getTotalPrice();
  const handleDelete = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };
  console.info("produit dans le panier ======>", CartProducts);
  return (
    <div className="flex flex-wrap md:flex-nowrap p-4 md:p-0 justify-center gap-8 md:w-[70%] m-auto md:pt-12 md:min-h-screen">
      <div className="w-full md:w-3/5">
        <div>
          {user?.message === "isLogged" ? (
            <h2 className="text-2xl font-semibold">
              Bonjour {user?.user?.lastname} {user?.user?.firstname},
            </h2>
          ) : (
            <div className="py-36">
              <div className="container bg-gray-300 gap-2">
                <p className="text-xl">
                  Connectez-vous, pour retrouver vos produits précédemment
                  ajoutés dans votre panier ou sauvegardés dans votre wishlist.
                </p>
              </div>
              <div className="items-center flex justify-center py-10">
                <Link to="/connecter">
                  <button className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
                    Se connecter
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        {user?.message === "isLogged" ? (
          <div>
            {cart.length === 0 ? (
              <div>Votre panier est vide...</div>
            ) : (
              <>
                <div>
                  {cart.map((product, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <div className="flex-grow mt-8 p-4 border-2 flex">
                        <img
                          src={`http://localhost:3310/${product.img_url}`}
                          alt={product.name}
                          className="w-32 h-46 object-cover rounded-lg mb-4"
                        />
                        <div className="ml-4">
                          <h2 className="text-2xl">{product.name}</h2>
                          <div className="flex flex-row gap-4 py-6 items-center">
                            <QuantityInCart product={product} />
                            <p className="text-xl text-blue-600">
                              {product.price} €
                            </p>
                          </div>
                          <div className="flex flex-row gap-4 items-center">
                            <AddToWishlist productId={product.id} />
                            <DeleteInCart
                              productId={product.id}
                              onDelete={handleDelete}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full gap-8 py-4">
                  <p className="text-slate-950 text-lg">Total :</p>
                  <p>{totalCart.toFixed(2)} €</p>
                </div>
                <Link to="/checkout">
                  <button className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
                    Valider mon panier
                  </button>
                </Link>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
