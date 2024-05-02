import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");

  if (userRole === "buyer") {
    return (
      <Box>
        <Stack
          sx={{ height: "100vh", marginTop: "10rem", alignItems: "center" }}
          spacing={4}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Khalti Payment Is Successfull.
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Thanks for shopping.
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "200px",

              marginTop: "0.5rem",
              padding: "0.75rem",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px 0px, rgba(0, 0, 0, 0.09) 0px 4px 2px 0px, rgba(0, 0, 0, 0.09) 0px 8px 4px 0px, rgba(0, 0, 0, 0.09) 0px 16px 8px 0px, rgba(0, 0, 0, 0.09) 0px 32px 16px 0px",
            }}
            onClick={() => {
              navigate("/product");
            }}
          >
            Keep Shopping
          </Button>
        </Stack>
      </Box>
    );
  }
};

export default PaymentSuccess;
