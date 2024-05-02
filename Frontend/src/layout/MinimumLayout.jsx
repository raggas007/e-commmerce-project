import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";

const MinimumLayout = () => {
  return (
    <Box>
      <CustomSnackbar />
      <Outlet />
    </Box>
  );
};

export default MinimumLayout;
