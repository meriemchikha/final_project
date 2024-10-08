/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import AddToWishlist from "../wishlist/AddToWishlist";
import ButtonAddProduct from "../product/ButtonAddProduct";
import { useCart } from "../../context/cartContext";

export default function Product({ products = [] }) {
  const { cart, setCart } = useCart();

  console.info("cart======>", cart);
  return (
    <div>
      <h3 className="text-2xl mb-4">Produits disponibles</h3>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center text-center">
          {products.map(({ id, name, img_url, price }) => (
            <div
              key={id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`/product/${id}`}
                className="mb-4 flex flex-col items-center"
              >
                <img
                  src={`http://localhost:3310/${img_url}`}
                  alt={name}
                  className="w-50 h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2 text-center">
                  <p className="font-bold text-lg">{name}</p>
                  <p className="font-semibold text-xl text-blue-600">{`${price} €`}</p>
                </div>
              </Link>
              <div>
                <AddToWishlist productId={id} />
                <ButtonAddProduct
                  product={{ id, name, img_url, price }}
                  cart={cart}
                  setCart={setCart}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">
          Aucun produit trouvé pour cette sous-catégorie.
        </p>
      )}
    </div>
  );
}
