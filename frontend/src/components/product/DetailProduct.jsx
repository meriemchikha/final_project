/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonAddProduct from "./ButtonAddProduct";
import Comment from "../comment/Comment";

export default function DetailProduct() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/product/${product_id}`
        );
        if (!response.ok) {
          throw new Error("Produit non trouvé");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  console.info(product_id);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Produit non trouvé</p>;
  }
  console.info(product);
  console.info(product.img_url);

  return (
    <>
      <div className="container  p-4 w-1/3">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img
            src={`http://localhost:3310/${product.img_url}`}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-xl font-semibold text-blue-600 mb-4">
            {product.price} €
          </p>
          <p className="text-lg mb-2">{product.description}</p>
        </div>
        <ButtonAddProduct product={product} />
      </div>
      <Comment />
    </>
  );
}
