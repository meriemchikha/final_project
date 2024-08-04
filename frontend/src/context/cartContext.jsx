/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext"; // Importer le UserContext

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useContext(UserContext); // Utiliser le UserContext pour obtenir les informations de l'utilisateur
  const [cart, setCart] = useState(() => {
    // Récupérer le panier depuis le localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!user) {
      // Réinitialiser le panier si l'utilisateur se déconnecte
      setCart([]);
    }
  }, [user]);

  // Sauvegarder le panier dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, userId) => {
    try {
      // En supposant que la réponse inclut les données du panier mises à jour
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: product.id,
            quantity: 1, // Quantité par défaut
          }),
        }
      );

      const updatedProduct = await response.json();

      setCart((prevCart) => {
        const existingProduct = prevCart.find((p) => p.id === product.id);
        if (existingProduct) {
          return prevCart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier", error);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
    // Vous devriez également supprimer l'article du backend
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`, {
      method: "DELETE",
    }).catch((error) =>
      console.error("Erreur lors de la suppression du panier", error)
    );
  };

  const updateProductQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );

    // Mettre à jour la quantité dans le backend
    // fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ quantity }),
    // }).catch((error) =>
    //   console.error(
    //     "Erreur lors de la mise à jour de la quantité du panier",
    //     error
    //   )
    // );
  };

  const cartCount = cart.reduce(
    (count, product) => count + product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        cartCount: user.user ? cartCount : 0, // Réinitialiser cartCount à 0 si l'utilisateur n'est pas connecté
        removeFromCart,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
