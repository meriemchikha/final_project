import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from "./App";
import Layout from "./components/layout/Layout";
import { UserProvider } from "./context/userContext";

import InscriptionPage from "./pages/InscriptionPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/categoryPage";
import Profile from "./components/Profile";
import Cart from "./pages/Cart";
import Product from "./components/product/Product";
import DetailProduct from "./components/product/DetailProduct";
import ContactPage from "./pages/ContactPage";

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
      { path: "/product", element: <Product /> },
      { path: "/detail-product", element: <DetailProduct /> },
      { path: "/connecter", element: <LoginPage /> },
      { path: "/inscrire", element: <InscriptionPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
