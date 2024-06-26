import React from "react";
import ProductCard from "../components/ProductCard";
import { Box, Stack } from "@mui/material";
import BuyerProductList from "./BuyerProductList";
import SellerProductList from "./SellerProductList";
import SearchBar from "../components/SearchBar";

const ProductList = () => {
  const userRole = localStorage.getItem("userRole");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
