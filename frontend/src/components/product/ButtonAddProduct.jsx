/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useCart } from "../../context/cartContext";

export default function ButtonAddProduct({ product, userId }) {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState("");

  const handleAddToCart = () => {
    addToCart(product, userId);
    setNotification("Votre Produit ajouté au panier avec succès !");
    setTimeout(() => {
      setNotification("");
    }, 3000); // La notification disparaît après 3 secondes
  };

  return (
    <div>
      <div className="text-rose-500 mt-2 flex justify-center">
        {notification}
      </div>
      <div className=" bottom-4 py-4 flex justify-center ">
        <button
          type="button"
          className="min-w-60 h-12 bg-slate-950 rounded-[50px] text-white mb-2"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
