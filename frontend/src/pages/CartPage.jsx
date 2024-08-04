/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import QuantityInCart from "../components/cart/QuantityInCart";

export default function CartPage() {
  const { cart, removeFromCart, setCart } = useCart(); // Ajoutez setCart pour passer au composant QuantityInCart
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3310/api/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [setUser]);

  console.info("user page panier", user);

  // Calculer le prix total
  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const totalCart = getTotalPrice();

  return (
    <PayPalScriptProvider options={{ "client-id": "votre-client-id" }}>
      <div className="flex flex-wrap md:flex-nowrap p-4 md:p-0 justify-center gap-8 md:w-[70%] m-auto md:pt-12 md:min-h-screen">
        <div className="w-full md:w-3/5">
          <div>
            {!user.isLogged ? (
              <>
                <h2 className="text-2xl font-semibold">
                  Bonjour {user?.user?.lastname} {user?.user?.firstname},
                </h2>
                <h3 className="text-xl font-medium mt-2">
                  Vous avez {cart.length} articles dans votre panier !
                </h3>
              </>
            ) : (
              <div className="flex gap-2">
                <p>Connectez-vous pour accéder à votre panier.</p>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold py-8">Panier</h1>
            <div className={`${!user.isLogged ? "flex" : "hidden"} gap-2`}>
              Connectez-vous pour accéder à votre panier!
              <Link to="/connecter">
                <div>
                  <p className=" text-sky-600 ">Connecte-toi</p>
                </div>
              </Link>
            </div>
            <div
              className={`${
                cart.length === 0 && !user.isLogged ? "flex" : "hidden"
              }`}
            >
              Votre panier est vide...
            </div>
            <div>
              {cart.map((product, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div className="flex-grow mt-8 p-4">
                    <h2 className="text-2xl">{product.name}</h2>
                    <img
                      src={`http://localhost:3310/${product.img_url}`}
                      alt={product.name}
                      className="w-50 h-52 object-cover rounded-lg mb-4"
                    />
                    <p className="text-xl text-blue-600">{product.price} €</p>
                    <QuantityInCart product={product} setCart={setCart} />{" "}
                    <FaTrashAlt
                      className="cursor-pointer text-red-600"
                      onClick={() => removeFromCart(product.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <div className="w-full">
            <div className="flex flex-col w-4/5 m-auto">
              <h2 className="text-slate-950 text-2xl font-bold pb-10 text-center">
                Récapitulatif
              </h2>
              <div>
                <div className="flex w-full justify-between pb-2">
                  <p>nombre d'article :</p>
                  <p>{cart.length}</p>
                </div>
                <div className="flex w-full justify-between pb-2">
                  <p>sous-total :</p>
                  <p>{totalCart.toFixed(2)} €</p>
                </div>
                <div className="flex w-full justify-between pb-4">
                  <p>frais de livraison :</p>
                  <p>gratuit</p>
                </div>
              </div>
              <div className="h-[1px] w-full bg-slate-200" />
              <div className="flex w-full justify-between py-4">
                <p className="text-slate-950 text-lg">Total :</p>
                <p>{totalCart.toFixed(2)} €</p>
              </div>
              <div className="h-[1px] w-full bg-slate-200" />
            </div>

            <div className="paypal-button-container mt-8">
              <PayPalButtons />
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
