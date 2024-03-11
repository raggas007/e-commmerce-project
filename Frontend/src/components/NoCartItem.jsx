import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoCartItem = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5">No item in cart</Typography>
      <Button
        sx={{ height: "50px", width: "200px" }}
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/product");
        }}
      >
        Continue Shopping
      </Button>
    </Stack>
  );
};

export default NoCartItem;
