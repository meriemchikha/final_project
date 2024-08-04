/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from "react";

export default function QuantityInCart({ product, setCart }) {
  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: parseInt(newQuantity, 10) }; // Assurez-vous de convertir en entier
        }
        return item;
      });
      return updatedCart;
    });
  };

  const quantities = Array.from({ length: 10 }, (_, i) => ({
    quantity: (i + 1).toString(),
  }));

  return (
    <div className="flex md:pb-6">
      <p className="text-[1.1rem] text-slate-600">Quantité</p>
      <select
        name="quantity"
        id="quantity"
        value={product.quantity}
        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
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
