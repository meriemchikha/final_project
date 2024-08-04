/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from "react";

export default function SousCategory({
  sousCategories,
  handleSousCategoryClick,
}) {
  return (
    <ul className="flex flex-wrap gap-4 mb-10 justify-center">
      {sousCategories.map(({ id, name }) => (
        <li key={id}>
          <button
            onClick={() => handleSousCategoryClick(id)}
            aria-label={`Voir les produits de la sous-catégorie ${name}`}
            className="rounded-[50px] bg-amber-600 text-white font-bold py-2 px-4 bottom-4 w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}
