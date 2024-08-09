/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DeleteInWishlist from "../components/wishlist/DeleteInWishlist";

export default function WishlistProductPage() {
  const { token } = useContext(UserContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3310/api/all-productsInWishlist`, {
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

  const handleDelete = (productId) => {
    setWishlistProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  console.info("wishlistProducts=====>", wishlistProducts);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <h3 className="text-3xl mb-4">Ma wishlist</h3>
      <p>Ajoutez vos produits préférés dans votre wishlist</p>
      <div className="flex bg-gray-200 py-10 w-2/3 justify-center">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map(({ id, img_url, name, price }) => (
              <div
                key={id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg"
              >
                <Link to={`/product/${id}`} className="block mb-4">
                  <img
                    src={`http://localhost:3310/${img_url}`}
                    alt={name}
                    className="w-50 h-48 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="font-semibold text-xl text-blue-600">{`${price} €`}</p>
                  </div>
                </Link>
                <DeleteInWishlist productId={id} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col py-4">
            <p className="text-red-500 text-2xl py-3">
              Votre wishlist est vide !
            </p>
            <span className="text-xl">
              Sélectionnez le coeur à côté de vos produits préférés afin de les
              retrouver dans votre wishlist.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
