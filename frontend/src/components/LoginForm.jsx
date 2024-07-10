import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { updateToken } = useContext(UserContext);
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

    fetch("http://localhost:3350/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("status res", res);
        if (res.status === 401) {
          console.error(
            `Failed to fetch user data. HTTP status: ${res.status}`
          );
          setMessage(res.message);
          return;
        }
        updateToken(res.token);
        navigate("/");
      })
      .catch((err) => console.info("err :>>", err));
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-cream">
      <div className="flex flex-col  items-center py-24">
        <form
          className="space-y-4 p-4 items-center  flex flex-col justify-center shadow-2xl bg-white w-1/2 "
          onSubmit={handlSubmit}
        >
          <h1 className=" mt-8 font-jacques text-xl">Se connecter</h1>
          <div className="relative flex flex-col gap-3 pb-10">
            <input
              className="border-2 pl-2 h-12 "
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handlChange}
              placeholder="Eamil"
            />
            <input
              className="border-2 pl-2 h-12"
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

          <button
            type="submit"
            className="bg-pink-400 hover:bg-pink-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
