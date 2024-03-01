import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartTable = () => {
  return (
    <Box
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <TableContainer component={Paper} sx={{ justifyContent: "center" }}>
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
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">1</Typography>
              </TableCell>
              <TableCell align="center">
                <img
                  src="https://m.media-amazon.com/images/I/81V7Eu9-oTL._AC_SL1500_.jpg"
                  alt="radio"
                  style={{
                    width: "250px",
                    height: "200px",
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Stack alignItems="center" spacing={2}>
                  <Typography variant="h6">Radio</Typography>
                  <Chip
                    label="Vintage Radio"
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
                  <Typography>3</Typography>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Rs.15000</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Rs.45000</Typography>
              </TableCell>
              <TableCell align="center">
                <ClearIcon color="error" sx={{ cursor: "pointer" }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartTable;
