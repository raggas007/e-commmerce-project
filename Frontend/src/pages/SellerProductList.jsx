import { Box, Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getSellerProduct } from "../lib/apis";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list"],
    queryFn: () => {
      return getSellerProduct();
    },
  });
  console.log(data);
  const productList = data?.data?.productList;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/product/add");
        }}
      >
        Add product
      </Button>
      <Box
        sx={{
          display: "flex",
          gap: "4rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
    </Box>
  );
};

export default SellerProductList;
