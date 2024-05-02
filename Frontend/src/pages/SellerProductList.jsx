import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import $axios from "../lib/axios.instance";

const SellerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 8,
      });
    },
  });

  const productList = data?.data?.productList;

  const totalPagesNumber = data?.data?.totalPagesNumber;

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
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Stack alignItems="center" mt="2rem" sx={{ width: "100%" }}>
        <Pagination
          count={totalPagesNumber}
          page={currentPage}
          color="secondary"
          showFirstButton
          showLastButton
          onChange={(_, page) => {
            setCurrentPage(page);
          }}
        />
      </Stack>
    </Box>
  );
};

export default SellerProductList;
