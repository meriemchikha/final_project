/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../context/userContext";

export default function AddToWishlist({ productId }) {
  const { user, token } = useContext(UserContext);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());

  useEffect(() => {
    // Fetch existing favorite products for the user (if needed)
  }, [user]);

  const toggleFavorite = async (product_id) => {
    if (!user) {
      console.error("Utilisateur non authentifié !");
      return;
    }

    setFavoriteProducts((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(product_id)) {
        newFavorites.delete(product_id);
      } else {
        newFavorites.add(product_id);
        // Envoi de la requête au backend pour ajouter à la wishlist
        fetch("http://localhost:3310/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assurez-vous que le token est correct
          },
          body: JSON.stringify({
            product_id,
            user_id: user.id,
            quantity: 1, // Modifiez ceci si vous souhaitez gérer la quantité
          }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                throw new Error(`Erreur réseau: ${errorData.message}`);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.info("Produit ajouté à la wishlist: data", data);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'ajout à la wishlist:",
              error.message
            );
          });
      }
      return newFavorites;
    });
  };

  return (
    <button
      onClick={() => toggleFavorite(productId)}
      className="mt-2 focus:outline-none"
      aria-label={
        favoriteProducts.has(productId)
          ? "Retirer des favoris"
          : "Ajouter aux favoris"
      }
    >
      {favoriteProducts.has(productId) ? (
        <AiFillHeart className="text-red-500" />
      ) : (
        <AiOutlineHeart className="text-gray-500" />
      )}
    </button>
  );
}
