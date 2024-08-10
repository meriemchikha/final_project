/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SousCategory from "../components/productSousCategory/SousCategory";
import Product from "../components/productSousCategory/Product";
// import { UserContext } from "../context/userContext";
import AddToWishlist from "../components/wishlist/AddToWishlist";
import CarouseMakeup from "../components/carousel/CarouselMakeup";

export default function SousCategoryPage() {
  // const { user, token } = useContext(UserContext);
  const { categoryId } = useParams();
  const [sousCategories, setSousCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSousCategory, setSelectedSousCategory] = useState(null);

  useEffect(() => {
    // Récupérer les sous-catégories
    fetch(`http://localhost:3310/api/sous-category/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        console.info("Sous-catégories reçues :", data);
        setSousCategories(data);
      })
      .catch((err) =>
        console.error(
          "Erreur lors de la récupération des sous-catégories :",
          err
        )
      );

    // Récupérer tous les produits
    fetch(`http://localhost:3310/api/product`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        console.info("Produits reçus :", data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des produits :", err)
      );
  }, [categoryId]);

  const handleSousCategoryClick = (sousCategoryId) => {
    if (selectedSousCategory === sousCategoryId) return;

    setSelectedSousCategory(sousCategoryId);
    console.info("Sous-catégorie sélectionnée :", sousCategoryId);

    const filtered = products.filter(
      (product) => product.sous_category_id === sousCategoryId
    );

    console.info("Produits filtrés :", filtered);
    setFilteredProducts(filtered);
  };
  console.info("filteredProducts============>", filteredProducts);
  return (
    <>
      <CarouseMakeup />
      <div className="container mx-auto py-8 px-4 ">
        <SousCategory
          sousCategories={sousCategories}
          handleSousCategoryClick={handleSousCategoryClick}
        />
        <Product
          products={filteredProducts}
          renderWishlist={(products) => <AddToWishlist products={products} />}
        />
      </div>
    </>
  );
}
