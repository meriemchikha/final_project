/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function WishlistProductPage() {
  const { token } = useContext(UserContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.info("Données de la wishlist :", data);
        setWishlistProducts(Array.isArray(data) ? data : [data]);
      });
  }, [token]);
  console.info("wishlistProducts=====>", wishlistProducts);
  return (
    <div>
      <h3 className="text-2xl mb-4">Mes Favoris</h3>
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(
            ({ product_id, product_img_url, product_name, product_price }) => (
              <div
                key={product_id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg"
              >
                <Link to={`/product/${product_id}`} className="block mb-4">
                  <img
                    src={`http://localhost:3310/${product_img_url}`}
                    alt={product_name}
                    className="w-50 h-48 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{product_name}</p>
                    <p className="font-semibold text-xl text-blue-600">{`${product_price} €`}</p>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-red-500">Aucun produit favori pour le moment.</p>
      )}
    </div>
  );
}
