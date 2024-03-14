import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";
import { fallbackImage } from "../constant/general.constant";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card
        sx={{
          maxWidth: "300px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <img
          onClick={() => {
            navigate(`/product/details/${props._id}`);
          }}
          src={props.image || fallbackImage}
          alt={props.name}
          style={{
            width: " 320px",
            height: "210px",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        />
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Chip label={props.brand} color="warning" variant="outlined" />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "justify",
            }}
          >
            {props.description}...
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ width: "100%", background: "purple" }}
            onClick={() => {
              navigate(`/product/details/${props._id}`);
            }}
          >
            Explore
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
