/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile"; // Assurez-vous que le chemin est correct

export default function Profile() {
  const [showUpdateForm, setShowUpdateForm] = useState(false); // État pour gérer l'affichage du formulaire de modification

  return (
    <div className=" h-screen">
      {!showUpdateForm ? (
        <div className="flex flex-col p-2">
          <Link to="/wishlist">
            <button className="w-52 h-8 text-left">Mes favoris</button>
          </Link>
          <Link to="/command">
            <button className="w-52 h-8 text-left">Mes commandes</button>
          </Link>

          <button
            onClick={() => setShowUpdateForm(true)} // Affiche le formulaire de modification
            className="w-52 h-8 text-left"
          >
            Modifier mes informations
          </button>
        </div>
      ) : (
        <UpdateProfile setShowUpdateForm={setShowUpdateForm} /> // Passez le setter pour pouvoir fermer le formulaire depuis UpdateProfile
      )}
    </div>
  );
}
