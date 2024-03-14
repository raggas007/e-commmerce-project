import { Box, CircularProgress } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";

const BuyerProductList = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: 1,
        limit: 8,
      });
    },
  });

  const productList = data?.data?.productList;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};
export default BuyerProductList;
