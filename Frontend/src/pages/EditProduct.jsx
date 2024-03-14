import { Formik } from "formik";
import React, { useState } from "react";
import { productCategories } from "../constant/general.constant";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const EditProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const productId = params?.id;

  //get products details
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });
  const productDetails = data?.data?.productDetails;

  //edit products details
  const { isLoading: editProductLoading, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (response) => {
      navigate(`/product/details/${productId}`);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isLoading || editProductLoading || imageLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Formik
        initialValues={{
          name: productDetails?.name || "",
          brand: productDetails?.brand || "",
          price: productDetails?.price || 0,
          quantity: productDetails?.quantity || 1,
          description: productDetails?.description || "",
          category: productDetails?.category || "",
          freeShipping: productDetails?.freeShipping || false,
          image: productDetails?.image || "",
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
            const cloudName = "dfxjppxps";

            const data = new FormData();

            data.append("file", productImage);
            data.append("upload_preset", "Parajuli_shopping123");
            data.append("cloud_name", cloudName);
            try {
              setImageLoading(true);
              const response = await axios.put(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                data
              );
              setImageLoading(false);
              imageUrl = response?.data?.secure_url;
            } catch (error) {
              console.log("image upload error");
            }
          }
          values.image = imageUrl;
          mutate(values);
        }}
      >
        {({ handleSubmit, getFieldProps, touched, errors, values }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              width: "450px",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <Typography variant="h5">Edit Product</Typography>
            {productDetails?.image && (
              <Stack sx={{ height: "250px" }}>
                <img
                  src={localUrl || productDetails?.image}
                  alt={productDetails?.name}
                  style={{ height: "100%" }}
                />
              </Stack>
            )}
            <input
              type="file"
              onChange={(event) => {
                const file = event?.target?.files[0];
                setProductImage(file);
                setLocalUrl(URL.createObjectURL(file));
              }}
            />
            <FormControl>
              <TextField label="Name" {...getFieldProps("name")} />
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
            <FormControl>
              <InputLabel>Category</InputLabel>
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
                checked={values.freeShipping}
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
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProduct;
