import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMutation, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";
import { fallbackImage } from "../constant/general.constant";

const CartTable = ({ cartItems }) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["remove-cart-item"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("get-cart-items");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <LinearProgress color="secondary" />}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  S.N.
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Image
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Name+Brand
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  quantity
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Unit Price
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Subtotal
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems?.map((item, index) => {
              return (
                <TableRow key={item._id}>
                  <TableCell align="center">
                    <Typography variant="h6">{index + 1}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={item?.image || fallbackImage}
                      alt=""
                      style={{
                        width: "250px",
                        height: "200px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack alignItems="center" spacing={2}>
                      <Typography variant="h6">{item?.name}</Typography>
                      <Chip
                        label={item.brand}
                        variant="filled"
                        color="secondary"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.1rem",
                      }}
                    >
                      <IconButton>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item?.orderedQuantity}</Typography>
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Rs.{item.price}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      Rs.{item?.orderedQuantity * item?.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        mutate(item?.productId);
                      }}
                    >
                      <ClearIcon color="error" sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartTable;
