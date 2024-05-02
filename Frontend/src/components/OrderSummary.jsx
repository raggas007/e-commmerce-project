import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { openErrorSnackbar } from "../stores/slices/snackbarSlices";

const OrderSummary = ({ orderSummary, grandTotal, productDataForOrdering }) => {
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["initiate-khalti"],
    mutationFn: async () => {
      return await $axios.post("/payment/khalti/start", {
        amount: grandTotal,
        productList: productDataForOrdering,
      });
    },
    onSuccess: (response) => {
      const paymentUrl = response?.data?.khaltiPaymentDetails?.payment_url;

      window.location.href = paymentUrl;
    },
    onError: () => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  {
    isLoading && <Loader color="secondary" />;
  }
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
        {orderSummary?.map((item, index) => {
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
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: "1rem" }}
        onClick={() => {
          mutate();
        }}
      >
        Pay with Khalti
      </Button>
    </Box>
  );
};

export default OrderSummary;
