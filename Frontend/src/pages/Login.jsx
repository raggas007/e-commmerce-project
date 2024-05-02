import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../stores/slices/snackbarSlices";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (response) => {
      //save token, with user role and username and usersurname in local storage

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userRole", response?.data?.user?.role);
      localStorage.setItem("firstName", response?.data?.user?.firstName);
      localStorage.setItem("lastName", response?.data?.user?.lastName);

      navigate("/home");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        textAlign: "center",
        backgroundSize: "cover",
      }}
    >
      {isLoading && <CircularProgress color="success" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Must be a valid email.")
            .required("Email is required.")
            .trim()
            .lowercase(),
          password: Yup.string().required("Password is required.").trim(),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            style={{
              minHeight: "350px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "mild",
              padding: "2rem",
              gap: "1rem",
              borderRadius: "10px",
              marginLeft: "38rem",
              marginTop: "8rem",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.05)",
            }}
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h4">Sign In</Typography>
            <FormControl sx={{ marginTop: "3rem" }}>
              <TextField
                required
                size="medium"
                label="Email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                fullWidth
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl size="medium">
              <InputLabel required>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps("password")}
                label="Password"
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: "2rem",
                padding: "1rem",
                background: "purple",
                boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
              }}
            >
              Login
            </Button>
            <Link
              to="/register"
              style={{
                marginTop: "3rem",
                textAlign: "center",
                display: "block",
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                sx={{ marginTop: "-3rem" }}
              >
                Need To Register? Sign up
              </Typography>
            </Link>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
