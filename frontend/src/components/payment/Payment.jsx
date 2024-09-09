/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, { useEffect } from "react";
import { useContext } from "react";
import { useCart } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

function Payment() {
  const { cart } = useCart();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AR64b-qx5vvSUzzR8IYjzU7pqS_MQj7xJ_4cgzEz8LJEmgwlo-8yDzsI3xspLfd84iSw6oVeFPQEIaEt";
      script.onload = () => {
        if (window.paypal) {
          window.paypal
            .Buttons({
              createOrder: async (data, actions) => {
                try {
                  const response = await fetch(
                    "http://localhost:3310/create-order",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        cartItems: cart.items,
                        cart_id: cart.id,
                      }), // Assurez-vous que cart.items et cart.id existent
                    }
                  );

                  // Assurez-vous que la réponse est au format JSON
                  const order = await response.json();

                  // Vérification si l'ID de paiement existe dans la réponse
                  if (order && order.payment_id) {
                    console.info("Order ID:", order.payment_id);
                    return order.payment_id; // Retourne l'ID de la commande PayPal
                  }
                  throw new Error(
                    "Erreur lors de la création de l'ordre PayPal."
                  );
                } catch (error) {
                  console.error(
                    "Erreur lors de la création de l'ordre PayPal:",
                    error
                  );
                  throw error; // Permet de faire apparaître l'erreur dans la console
                }
              },
              onApprove: async (data, actions) => {
                try {
                  const response = await fetch(
                    "http://localhost:3310/save-command",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        payment: "Paypal",
                        statut: "paid", // Statut du paiement
                        user_id: "16", // Remplacez par l'ID de l'utilisateur connecté
                        cart_id: cart.id, // Utilisez l'ID du panier correct
                        payment_id: data.orderID, // Utilisez l'orderID de PayPal
                      }),
                    }
                  );

                  const saveCommandResponse = await response.json();

                  if (
                    saveCommandResponse.message ===
                    "Commande enregistrée avec succès"
                  ) {
                    alert("Paiement et commande enregistrés avec succès !");
                  } else {
                    alert("Erreur lors de l'enregistrement de la commande");
                  }
                } catch (error) {
                  console.error(
                    "Erreur lors de l'enregistrement de la commande:",
                    error
                  );
                  alert(
                    "Une erreur est survenue lors de l'enregistrement de la commande."
                  );
                }
              },
            })
            .render("#paypal-button-container");
        }
      };
      document.body.appendChild(script);
    };

    if (cart.length > 0) {
      loadPayPalScript();
    }
  }, [cart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Passer à la caisse</h1>
      <div id="paypal-button-container" />
    </div>
  );
}

export default Payment;
