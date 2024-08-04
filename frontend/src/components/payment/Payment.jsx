/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useCart } from "../../context/cartContext";

function Payment() {
  const { cart } = useCart();

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
                // Créer une commande côté serveur
                const order = await fetch(
                  "http://localhost:3310/create-order",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cart }),
                  }
                ).then((res) => res.json());

                return order.id;
              },
              // Retirer la fonction onApprove
              onCancel: (data) => {
                console.log("Paiement annulé:", data);
                // Optionnel: Notifier l'utilisateur du paiement annulé
                alert("Paiement annulé !");
                // Vous pouvez ajouter une logique pour gérer l'annulation du paiement
              },
              onError: (err) => {
                console.error("Erreur de paiement:", err);
                // Optionnel: Notifier l'utilisateur d'une erreur de paiement
                alert("Une erreur s'est produite lors du paiement.");
                // Vous pouvez ajouter une logique pour gérer l'erreur du paiement
              },
            })
            .render("#paypal-button-container");
        }
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [cart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Passer à la caisse</h1>
      <div id="paypal-button-container" />
    </div>
  );
}

export default Payment;
