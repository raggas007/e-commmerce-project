import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "10vh",
        width: "100vw",
        background: "#0B60B0",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">copyright @ NEPAL MART 2024</Typography>
    </Box>
  );
};

export default Footer;
