/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from "react";
import { useCart } from "../../context/cartContext"; // Importer le hook useCart

export default function QuantityInCart({ product }) {
  const { updateProductQuantity } = useCart(); // Accéder à updateProductQuantity depuis le CartContext

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10); // Convertir en entier
    updateProductQuantity(product.id, newQuantity); // Appeler la fonction du contexte pour mettre à jour la quantité
  };

  const quantities = Array.from({ length: 10 }, (_, i) => ({
    quantity: (i + 1).toString(),
  }));

  return (
    <div className="flex md:pb-6 gap-2 border-2">
      {/* <p className="text-[1.1rem] text-slate-600">Quantité</p> */}
      <select
        name="quantity"
        id="quantity"
        value={product.quantity}
        onChange={handleQuantityChange}
      >
        {quantities.map((quantity) => (
          <option key={quantity.quantity} value={quantity.quantity}>
            {quantity.quantity}
          </option>
        ))}
      </select>
    </div>
  );
}
