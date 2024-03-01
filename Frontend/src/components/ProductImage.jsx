import { Box } from "@mui/material";
import React from "react";
import { fallbackImage } from "../constant/general.constant";

const ProductImage = (props) => {
  return (
    <Box sx={{ width: "50%" }}>
      <img
        src={props.imageUrl || fallbackImage}
        alt=""
        style={{
          width: "550px",
          height: "400px",
        }}
      />
    </Box>
  );
};

export default ProductImage;
