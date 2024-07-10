import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function InscriptionForm() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone_mobile: "",
  });
  console.info(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Valider le mot de passe
    if (!passwordRegex.test(formData.password)) {
      // eslint-disable-next-line no-alert
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre."
      );
      return;
    }
    // Si le mot de passe est valide, soumettre les données
    fetch("http://localhost:3350/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        navigate("/connecter");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col  items-center py-24">
      <form
        className="space-y-4 p-4 md:items-center  flex flex-col justify-center shadow-2xl bg-white w-1/2   "
        onSubmit={handleSubmit}
      >
        <div className="flex  flex-row gap-6 md:w-96  ">
          <div className="flex flex-col">
            <h2>Prénom</h2>
            <input
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Firstname"
              required
            />
          </div>
          <div className="flex flex-col">
            <h2>Nom de famille</h2>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Lastname"
              required
            />
          </div>
        </div>

        <div className="md:w-96">
          <h2>Numéro de téléphone</h2>
          <input
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="texte"
            name="phone_mobile"
            value={formData.phone_mobile}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="md:w-96">
          <h2>Email</h2>
          <input
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="md:w-96">
          <h2>Mot de passe</h2>
          <input
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          {errorMessage && (
            <p className="text-red-500 md:w-96 ">{errorMessage}</p>
          )}
          <button
            type="submit"
            className=" bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 md:w-96 rounded focus:outline-none focus:shadow-outline"
          >
            S'inscrire
          </button>

          <Link to="/connecter">
            <button
              type="button"
              className="bg-pink-400 hover:bg-pink-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              se connecter
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
