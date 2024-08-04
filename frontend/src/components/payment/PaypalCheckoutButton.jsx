/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PaypalCheckoutButton(props) {
  const { panier } = props;
  console.info("panier dans paypal", panier);

  //  const [processing, setProcessing] = useState(false);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    // call backend function to fulfill order
    console.info("orderID", orderID);
    // if res is success
    setPaidFor(true);
    // refresh user's account or subscription status
  };

  const handleCancel = () => {
    // Reset processing state when user cancels the order
    // setProcessing(false);
    setPaidFor(false); // Reset paidFor state as well if the order is canceled
  };

  // if (processing) {
  //   // Show loading or processing indicator
  //   return <div>Processing...</div>;
  // }

  if (paidFor) {
    // Show confirmation message
    return <div>Merci pour votre achat ! 😊</div>;
  }

  if (error) {
    // Display error message
    return <div>Une erreur est survenue : {error.message}</div>;
  }

  return (
    <PayPalButtons
      style={{
        color: "silver",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        console.info("panier", panier.price, panier.description);

        return actions.order.create({
          purchase_units: [
            {
              description: panier.description,
              amount: {
                value: panier?.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        // setProcessing(true);
        try {
          const order = await actions.order.capture();
          handleApprove(data.orderID);
          console.info("order", order);
        } catch (err) {
          setError(err);
          console.error("paypal checkout onError", err);
        }
        //  finally {
        //   setProcessing(false);
        // }
      }}
      onCancel={handleCancel}
      onError={(err) => {
        setError(err);
        console.error("paypal checkout onError", err);
      }}
    />
  );
}
