import { Box } from "@mui/material";
import React from "react";
import ProductImage from "../components/ProductImage";
import ProductDescription from "../components/ProductDescription";
import { useQuery } from "react-query";
import { getProductDetails } from "../lib/apis";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const params = useParams();
  const productId = params?.id;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: () => {
      return getProductDetails(productId);
    },
  });
  const productDetails = data?.data?.productDetails;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: "80%",

        justifyContent: "center",
        alignItems: "center",
        textAlign: "justify",
        padding: "2rem",
        margin: "2rem",
        gap: "8rem",
        boxShadow:
          " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
    >
      <ProductImage imageUrl={productDetails?.image} />
      <ProductDescription {...productDetails} />
    </Box>
  );
};

export default ProductDetail;
