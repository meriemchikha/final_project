/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Product({
  products = [],
  favoriteProducts,
  toggleFavorite,
}) {
  return (
    <div>
      <h3 className="text-2xl mb-4">Produits disponibles</h3>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(({ product_id, name, img_url, description, price }) => {
            console.info("Product====>:", products);
            return (
              <div
                key={product_id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link
                  to={`/product/${product_id}`}
                  className="block overflow-hidden mb-4"
                >
                  <img
                    src={`http://localhost:3310/${img_url}`}
                    alt={name}
                    className="w-50 h-48 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-bold text-lg">{name}</p>
                      <p className="text-gray-700">{description}</p>
                    </div>
                    <p className="font-semibold text-xl text-blue-600">{`${price} €`}</p>
                  </div>
                </Link>
                <button
                  onClick={() => toggleFavorite(product_id)}
                  className="mt-2 focus:outline-none"
                  aria-label={
                    favoriteProducts.has(product_id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  {favoriteProducts.has(product_id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-500" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-red-500">
          Aucun produit trouvé pour cette sous-catégorie.
        </p>
      )}
    </div>
  );
}
