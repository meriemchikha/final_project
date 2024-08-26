import React, { useState } from "react";
import "./newsletter.css";

export default function Newsletter() {
  // État pour l'adresse e-mail
  const [email, setEmail] = useState("");
  // État pour le message de succès ou d'erreur
  const [message, setMessage] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    console.info("Submitting email:", email); // Vérifie la valeur de l'email

    try {
      const response = await fetch(`http://localhost:3310/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed!");
        setEmail(""); // Réinitialiser le champ d'email
      } else {
        setMessage(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
      console.error("There was an error subscribing to the newsletter!", error);
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
