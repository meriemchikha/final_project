import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useCart } from "../context/cartContext"; // Importer le CartContext

export default function LoginForm() {
  const navigate = useNavigate();
  const { updateToken } = useContext(UserContext);
  const { createCart } = useCart(); // Accéder à la fonction createCart
  const [message, setMessage] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3310/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401) {
          setMessage(res.message);
          return;
        }

        // Mettre à jour le token dans le UserContext
        updateToken(res.token);
        // Naviguer vers la page d'accueil après la connexion et la création du panier
        navigate("/");

        // Créer un panier pour l'utilisateur connecté
        createCart();
      })
      .catch((err) => console.info("err :>>", err));
  };

  return (
    <main className="min-h-[calc(100vh-200px)]  ">
      <div className=" text-center">
        <h1 className=" text-2xl text-center py-10">Bienvenue chez Beauty </h1>
        <span className=" text-xl">
          Vous avez déjà un compte ? Ravi de vous revoir !
        </span>
      </div>
      <div className="flex flex-col  items-center py-24">
        <form
          className="space-y-4 p-4 items-center  flex flex-col justify-center shadow-2xl bg-white w-1/2 "
          onSubmit={handlSubmit}
        >
          <div className=" flex flex-col w-full md:w-1/2 gap-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handlChange}
              placeholder="Email"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={dataForm.password}
              onChange={handlChange}
              placeholder="Password"
            />

            {message && (
              <p className="absolute bottom-0 text-red-600">{message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Se connecter
            </button>
          </div>
          <div className=" flex gap-1">
            <p>Créer un compte? </p>
            <Link to="/inscrire">
              <p className=" text-violet-700">Cliquer ici</p>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
