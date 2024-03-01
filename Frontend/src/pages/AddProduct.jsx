import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { addProduct } from "../lib/apis";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddProduct = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProduct,
    onSuccess: (response) => {
      navigate("/product");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <Box
      sx={{
        minHeight: "120vh",
        width: "100vw",
        background: "gray",
      }}
    >
      {isLoading && <Loader />}
      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: "",
          quantity: 1,
          description: "",
          category: "",
          freeShipping: false,
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("name is required")
            .trim()
            .max(55, "maximum character of name is 55 "),
          brand: Yup.string()
            .required("brand is required")
            .trim()
            .max(55, "maximum character of brand is 55 "),
          price: Yup.number()
            .required("price is required.")
            .min(0, "minimum price should be 0."),
          quantity: Yup.number()
            .required("quantity is required.")
            .min(1, "minimum quantity should be 1."),
          description: Yup.string()
            .required("description is required")
            .trim()
            .min(500, "the description should be at least 500 characters.")
            .max(
              1000,
              "the description should be not more than 1000 characters."
            ),

          category: Yup.string()
            .required("select one category.")
            .trim()
            .oneOf(productCategories),
          freeShipping: Yup.boolean().default(false),
          image: Yup.string().nullable().trim(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit, touched, errors, getFieldProps }) => (
          <form
            style={{
              minHeight: "100vh",
              width: "300px",
              margin: "-4rem",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "pink",
              padding: "1.5rem",
              gap: "0.4rem",
              marginLeft: "38rem",
              marginTop: "3rem",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.05)",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h5" color="yellow">
              Add Product
            </Typography>
            <FormControl sx={{ marginTop: "1rem" }}>
              <TextField
                sx={{ bgcolor: "white" }}
                required
                size="medium"
                label="Name"
                {...getFieldProps("name")}
              />
              {touched.name && errors.name ? (
                <FormHelperText error>{errors.name}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField
                sx={{ bgcolor: "white" }}
                required
                size="medium"
                label="Brand"
                {...getFieldProps("brand")}
              />
              {touched.brand && errors.brand ? (
                <FormHelperText error>{errors.brand}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField
                sx={{ bgcolor: "white" }}
                required
                size="medium"
                label="Price"
                type="number"
                {...getFieldProps("price")}
              />
              {touched.price && errors.price ? (
                <FormHelperText error>{errors.price}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl>
              <TextField
                sx={{ bgcolor: "white" }}
                required
                size="medium"
                label="Quantity"
                type="number"
                {...getFieldProps("quantity")}
              />
              {touched.quantity && errors.quantity ? (
                <FormHelperText error>{errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel required>Category</InputLabel>
              <Select label="Category" {...getFieldProps("category")}>
                {productCategories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {touched.category && errors.category ? (
                <FormHelperText error>{errors.category}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography>Free Shipping</Typography>
              <Checkbox
                label="Free Shipping"
                {...getFieldProps("freeShipping")}
              />
            </FormControl>
            <FormControl>
              <TextField
                sx={{ bgcolor: "white" }}
                label="Description"
                multiline
                rows={7}
                {...getFieldProps("description")}
              />
              {touched.description && errors.description ? (
                <FormHelperText error>{errors.description}</FormHelperText>
              ) : null}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddProduct;
