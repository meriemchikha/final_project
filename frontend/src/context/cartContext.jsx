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
  const [cartId, setCartId] = useState(() => {
    // Récupérer l'id du panier depuis le localStorage
    return localStorage.getItem("cartId");
  });

  useEffect(() => {
    if (!user) {
      // Réinitialiser le panier si l'utilisateur se déconnecte
      setCart([]);
      setCartId(null);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.id) {
      localStorage.setItem("cart_id", cart.id);
    }
  }, [cart, cart.id]);

  const createCart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.user?.id }), // Envoyer l'ID utilisateur pour créer un panier
        }
      );
      const data = await response.json();
      setCartId(data.id); // Stocker l'ID du panier
      localStorage.setItem("cartId", data.id);
    } catch (error) {
      console.error("Erreur lors de la création du panier", error);
    }
  };

  useEffect(() => {
    if (user && !cartId) {
      // Créer un panier lorsque l'utilisateur se connecte
      createCart();
    }
  }, [user]);

  const addToCart = async (product) => {
    if (!cartId) {
      await createCart();
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/product-in-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
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

  const removeFromCart = async (productId) => {
    if (!cartId) return; // Pas de panier, pas de suppression
    try {
      await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/product/${productId}/${cartId}`,
        {
          method: "DELETE",
        }
      );
      setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du panier", error);
    }
  };

  const updateProductQuantity = async (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );

    if (cartId) {
      try {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/product-in-cart/${cartId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          }
        );
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la quantité du panier",
          error
        );
      }
    }
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
        cartCount: user.user ? cartCount : 0,
        removeFromCart,
        updateProductQuantity,
        cartId, // Ajouter cartId au contexte
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
