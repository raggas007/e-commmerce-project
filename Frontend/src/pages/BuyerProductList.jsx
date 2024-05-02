import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const BuyerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const values = useSelector((state) => state.product);

  console.log(values);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 8,
      });
    },
  });

  const productList = data?.data?.productList;
  const numberOfPages = data?.data?.numberOfPages;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Stack
        sx={{
          marginTop: "-7rem",
          marginBottom: "3rem",
          width: "25%",
        }}
      >
        <SearchBar />
      </Stack>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
        <Stack alignItems="center" mt="2rem" sx={{ width: "100%" }}>
          <Pagination
            count={numberOfPages}
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
    </>
  );
};
export default BuyerProductList;
