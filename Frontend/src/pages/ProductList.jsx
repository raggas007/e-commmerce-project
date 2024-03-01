import React from "react";
import ProductCard from "../components/ProductCard";
import { Box } from "@mui/material";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("userRole");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        flexWrap: "wrap",
        marginLeft: "1rem",
        marginTop: "3rem",
      }}
    >
      {userRole === "buyer" ? <BuyerProductList /> : <SellerProductList />}
    </Box>
  );
};

export default ProductList;
