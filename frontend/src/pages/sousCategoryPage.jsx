/* eslint-disable camelcase */
// SousCategoryPage.js
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SousCategory from "../components/productSousCategory/SousCategory";
import Product from "../components/productSousCategory/Product";
import { UserContext } from "../context/userContext";

export default function SousCategoryPage() {
  const { user, token } = useContext(UserContext);
  const { categoryId } = useParams();
  const [sousCategories, setSousCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSousCategory, setSelectedSousCategory] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());

  useEffect(() => {
    fetch(`http://localhost:3310/api/sous-category/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => setSousCategories(data))
      .catch((err) =>
        console.error(
          "Erreur lors de la récupération des sous-catégories :",
          err
        )
      );
  }, [categoryId]);

  const handleSousCategoryClick = (sousCategoryId) => {
    if (selectedSousCategory === sousCategoryId) return;

    setSelectedSousCategory(sousCategoryId);
    fetch(
      `http://localhost:3310/api/All-Product?sousCategoryId=${sousCategoryId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        console.info("Données des produits:", data); // Vérifiez la structure ici
        setProducts(data);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des produits :", err)
      );
  };

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
    <div className="container mx-auto py-8 px-4 h-[850px]">
      <SousCategory
        sousCategories={sousCategories}
        handleSousCategoryClick={handleSousCategoryClick}
      />
      {selectedSousCategory && (
        <Product
          products={products}
          favoriteProducts={favoriteProducts}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
