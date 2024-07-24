import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";

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
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre."
      );
      return;
    }

    fetch("http://localhost:3310/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/connecter");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-pink-200 via-pink-400 to-pink-500 items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden relative w-full   p-6 md:p-12">
        <div className="md:flex-shrink-0 relative w-full md:w-1/2">
          <img
            src={login}
            alt="Login"
            className="object-cover w-full h-64 md:h-full"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-2xl md:text-2xl lg:text-3xl text-rose-700 text-opacity-80">
            Pensez à s'inscrire !!
          </h1>
        </div>
        <div className="flex flex-col py-8 px-4 md:px-8 w-full md:w-1/2">
          <form
            className="space-y-4 p-4 flex flex-col justify-center w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  htmlFor="firstname"
                  className="text-gray-700 font-semibold mb-1"
                >
                  Prénom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Firstname"
                  required
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  htmlFor="lastname"
                  className="text-gray-700 font-semibold mb-1"
                >
                  Nom de famille
                </label>
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
            <div className="w-full">
              <label
                htmlFor="address"
                className="text-gray-700 font-semibold mb-1"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="address"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone_mobile"
                className="text-gray-700 font-semibold mb-1"
              >
                Numéro de téléphone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="phone_mobile"
                value={formData.phone_mobile}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold mb-1"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="text-gray-700 font-semibold mb-1"
              >
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              {errorMessage && (
                <p className="text-red-500 w-full">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              >
                S'inscrire
              </button>
              <div className="flex gap-1">
                <p>Vous avez déjà un compte?</p>
                <Link to="/connecter">
                  <p className="text-violet-700">Cliquer ici</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
