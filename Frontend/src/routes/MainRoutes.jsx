import React from "react";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductList from "../pages/ProductList";
import AddProduct from "../pages/AddProduct";
import ProductsDetail from "../pages/ProductDetail";
import EditProduct from "../pages/EditProduct";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";

const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product",
        element: <ProductList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/add",
        element: <AddProduct />,
      },
      {
        path: "product/details/:id",
        element: <ProductsDetail />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment/khalti/success",
        element: <PaymentSuccess />,
      },
    ],
  },
];

export default MainRoutes;
