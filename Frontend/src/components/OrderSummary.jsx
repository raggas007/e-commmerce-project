import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const OrderSummary = ({ orderSummary }) => {
  return (
    <Box
      sx={{
        marginTop: "2.5rem",
        padding: "2rem",
        height: "250px",
        width: "300px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Order Summary
        </Typography>
        {orderSummary.map((item, index) => {
          return (
            <Stack
              direction="row"
              sx={{
                textAlign: "justify",
                justifyContent: "space-evenly",
              }}
              key={index}
            >
              <Typography
                variant="subtitle1"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {item?.name}:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item?.value}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Button variant="contained" color="success" sx={{ marginTop: "1rem" }}>
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;
