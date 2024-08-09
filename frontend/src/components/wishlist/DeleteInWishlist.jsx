/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
import React, { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { UserContext } from "../../context/userContext";

export default function DeleteInWishlist({ productId, onDelete }) {
  const { token } = useContext(UserContext);

  const handleDelete = () => {
    fetch(`http://localhost:3310/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du produit");
        }
        return response.json();
      })
      .then(() => {
        console.info("Produit supprimé de la wishlist");
        if (onDelete) onDelete(productId); // Appel de la fonction de rappel pour mettre à jour la liste
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
      aria-label="Supprimer de la wishlist"
    >
      <span className="text-lg">
        <FaTrashAlt />
      </span>
    </button>
  );
}
