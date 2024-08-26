import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/cartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  // Calculer le prix total
  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const totalCart = getTotalPrice();

  return (
    <div className="flex items-center justify-center min-h-screen">
      {" "}
      {/* Utilisation de Flexbox pour centrer */}
      <div className="checkout-page w-[600px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-slate-950 text-2xl font-bold pb-10 text-center">
          Récapitulatif
        </h2>
        <div className="flex w-full justify-between pb-2">
          <p>Nombre d'article :</p>
          <p>{cart.length}</p>
        </div>
        <div className="flex w-full justify-between pb-2">
          <p>Sous-total :</p>
          <p>{totalCart.toFixed(2)} €</p>
        </div>
        <div className="flex w-full justify-between pb-4">
          <p>Frais de livraison :</p>
          <p>Gratuit</p>
        </div>
        <div className="h-[1px] w-full bg-slate-200" />
        <div className="flex w-full justify-between py-4">
          <p className="text-slate-950 text-lg">Total :</p>
          <p>{totalCart.toFixed(2)} €</p>
        </div>
        <div className="h-[1px] w-full bg-slate-200" />

        <PayPalScriptProvider
          options={{
            "client-id":
              "ASMbz4aZmdtW2N1u0rTFROXnP_-RmZJtQHVFPSGO6QAVCRd5oqGuSe9vZ7Gp4WSCBoHoDbOLBInF0w0c",
          }}
        >
          <div className="paypal-button-container mt-8">
            <PayPalButtons />
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
