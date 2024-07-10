import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from "./App";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/layout/Layout";
import { UserProvider } from "./context/userContext";

import InscriptionPage from "./pages/InscriptionPage";
import LoginPage from "./pages/LoginPage";

function AppLayout() {
  return (
    <UserProvider>
      <Layout>
        <Outlet />
      </Layout>
    </UserProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/connecter", element: <LoginPage /> },
      { path: "/inscrire", element: <InscriptionPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
