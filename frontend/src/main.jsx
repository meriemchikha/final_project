import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from "./App";
import Layout from "./components/layout/Layout";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext"; // Importez votre CartProvider

import InscriptionPage from "./pages/InscriptionPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/categoryPage";
import Profile from "./components/profile/Profile";
import Cart from "./pages/CartPage";
import Product from "./components/productSousCategory/Product";
import DetailProduct from "./components/product/DetailProduct";
import ContactPage from "./pages/ContactPage";
import SousCategoryPage from "./pages/sousCategoryPage";
import WishlistProductPage from "./pages/WishlistProductPage";
import Comment from "./components/comment/Comment";
import Payment from "./components/payment/Payment";
import Newsletter from "./components/newsletter/Newsletter";
import CheckoutPage from "./pages/CheckoutPage";

function AppLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <Layout>
          <Outlet />
          <Newsletter />
        </Layout>
      </CartProvider>
    </UserProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/product/sous-category/:sousCategoryId", element: <Product /> },
      {
        path: "/product/:product_id",
        element: <DetailProduct />,
      },
      { path: "/connecter", element: <LoginPage /> },
      { path: "/inscrire", element: <InscriptionPage /> },
      { path: "/category", element: <CategoryPage /> },
      {
        path: "/sous-category/category/:categoryId",
        element: <SousCategoryPage />,
      },
      { path: "/profile", element: <Profile /> },
      { path: "/cart", element: <Cart /> },
      { path: "/payment", element: <Payment /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/wishlist", element: <WishlistProductPage /> },
      { path: "/comment", element: <Comment /> },
      { path: "/checkout", element: <CheckoutPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
