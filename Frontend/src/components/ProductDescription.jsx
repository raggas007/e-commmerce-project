import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";
import { useMutation, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../stores/slices/snackbarSlices";

const ProductDescription = (props) => {
  const userRole = localStorage.getItem("userRole");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const queryClient = useQueryClient();
  const [count, setCount] = useState(1);

  //increase order
  const increaseCount = () => {
    if (count === props.quantity) {
      return;
    }
    setCount(count + 1);
  };

  //decrease order
  const decreaseCount = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };
  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/item/add", {
        productId: params?.id,
        orderedQuantity: count,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries("get-cart-item-count");
      dispatch(openSuccessSnackbar(response?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  return (
    <Box>
      <Grid container direction="column" spacing={1} sx={{ width: "100%" }}>
        <Grid item>
          <Typography variant="h5">{props.name}</Typography>
        </Grid>

        <Grid item>
          <Chip label={props.brand} color="primary" variant="outlined" />
          <Grid item sx={{ marginTop: "1rem" }}>
            <Typography
              sx={{
                textAlign: "justify",
              }}
            >
              {`${props.description}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Typography>Price:</Typography>
            <Typography>{props.price}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={1}>
            <Typography>Available Quantity:</Typography>
            <Typography>{props.quantity}</Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Chip label={props.category} color="secondary" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Free Shipping:</Typography>
          <Checkbox checked={props.freeShipping} color="error" />
        </Stack>

        {userRole === "buyer" && (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={decreaseCount} disabled={count === 1}>
                <RemoveIcon />
              </IconButton>
              <Typography>{count}</Typography>
              <IconButton
                onClick={increaseCount}
                disabled={count === props.quantity}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Grid>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  mutate();
                }}
              >
                ADd to cart
              </Button>
            </Grid>
          </>
        )}
        {userRole === "seller" && (
          <Grid item>
            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={() => {
                  navigate(`/product/edit/${props._id}`);
                }}
              >
                <Typography> edit Product </Typography>
              </Button>
              <DeleteProductDialog />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDescription;
