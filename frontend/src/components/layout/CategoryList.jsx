/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./categoryList.css"; // Assurez-vous d'ajouter le CSS pour le style

export default function CategoryList({ categories }) {
  return (
    <div className="category-list absolute bg-white shadow-lg p-4">
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="hover:text-main p-2">
            <Link to={category.path}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
