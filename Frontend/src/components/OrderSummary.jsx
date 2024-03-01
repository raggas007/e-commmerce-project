import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const OrderSummary = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        height: "230px",
        width: "300px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Order Summary
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
          }}
        >
          <Typography>Subtotal:</Typography>
          <Typography>45000</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
          }}
        >
          <Typography>Dsicount:</Typography>
          <Typography>2300</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
          }}
        >
          <Typography>Grandtotal:</Typography>
          <Typography>42700</Typography>
        </Stack>
      </Stack>
      <Button variant="contained" color="success" sx={{ marginTop: "1rem" }}>
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;
