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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { productCategories } from "../constant/general.constant";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { addProduct } from "../lib/apis";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

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
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {(isLoading || imageLoading) && <Loader />}
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
        onSubmit={async (values) => {
          let imageUrl;
          if (productImage) {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
            const data = new FormData();
            data.append("file", productImage);
            data.append("upload_preset", uploadPreset);
            data.append("cloud_name", cloudName);

            try {
              setImageLoading(true);
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                data
              );
              setImageLoading(false);
              imageUrl = response?.data?.secure_url;
            } catch (error) {
              setImageLoading(false);
              console.log("image upload error");
            }
          }
          values.image = imageUrl;
          mutate(values);
        }}
      >
        {({ handleSubmit, touched, errors, getFieldProps }) => (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              marginLeft: "30rem",
              width: "450px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h5"
              color="Black"
              sx={{ marginBottom: "2rem" }}
            >
              Add Product
            </Typography>
            {productImage && (
              <Stack sx={{ height: "200px" }}>
                <img
                  src={localUrl}
                  style={{
                    height: "100%",
                  }}
                />
              </Stack>
            )}
            <FormControl>
              <input
                type="file"
                onChange={(event) => {
                  const file = event?.target?.files[0];
                  setProductImage(file);
                  setLocalUrl(URL.createObjectURL(file));
                }}
              />
            </FormControl>
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
            <FormControl fullWidth sx={{ bgcolor: "white" }}>
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
              <Typography variant="subtitle1" color="Black">
                Free Shipping
              </Typography>
              <Checkbox
                label="Free Shipping"
                {...getFieldProps("freeShipping")}
                sx={{ color: "Black" }}
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
