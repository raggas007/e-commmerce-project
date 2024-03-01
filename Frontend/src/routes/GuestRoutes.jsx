import React from "react";
import MinimumLayout from "../layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const GuestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default GuestRoutes;
