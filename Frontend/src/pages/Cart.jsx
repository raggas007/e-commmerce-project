import React from "react";
import CartTable from "../components/CartTable";
import OrderSummary from "../components/OrderSummary";
import { Box } from "@mui/material";

const Cart = () => {
  return (
    <Box sx={{ display: "flex", gap:"4rem" }}>
      <CartTable />
      <OrderSummary />
    </Box>
  );
};

export default Cart;
