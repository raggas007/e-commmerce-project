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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const minDate = dayjs().startOf("d").subtract(18, "y");

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (response) => {
      console.log(response);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <Box
      sx={{
        marginTop: "2rem",
        minHeight: "100vh",
        minWidth: "100vw",
        textAlign: "center",
        backgroundSize: "cover",
      }}
    >
      {isLoading && <Loader color="secondary" />}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          dob: "",
          gender: "",
          role: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("first name is required")
            .trim()
            .max(55, "first name should be at max 55 character"),
          lastName: Yup.string()
            .required("last name is required")
            .trim()
            .max(55, "last name should be at max 55 character"),
          email: Yup.string()
            .email()
            .required("email is required")
            .trim()
            .lowercase()
            .max(55, "email should be at max 55 character"),
          password: Yup.string()
            .trim()
            .required("password is required")
            .min(4, "password must be atleast 4 character.")
            .max(20, "password must be at most 20 character"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password is required.")
            .trim(),
          dob: Yup.date().nullable(),
          gender: Yup.string()
            .nullable()
            .required("gender is required.")
            .trim()
            .oneOf(["male", "female", "other"]),
          role: Yup.string()
            .required("role is required.")
            .trim()
            .oneOf(["buyer", "seller"]),
        })}
        onSubmit={(values) => {
          values.dob = null;
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "2rem",
              marginLeft: "600px",
              width: "330px",

              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <Typography variant="h6" color="red">
              Sign Up
            </Typography>
            <FormControl sx={{ marginTop: "1rem", backgroundColor: "white" }}>
              <TextField
                required
                size="small"
                label="First Name"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl sx={{ marginTop: "1rem", backgroundColor: "white" }}>
              <TextField
                required
                size="small"
                label="Last Name"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl sx={{ marginTop: "1rem", backgroundColor: "white" }}>
              <TextField
                required
                size="small"
                label="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              sx={{ marginTop: "1rem", backgroundColor: "white" }}
              size="small"
            >
              <InputLabel required>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "Password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps("password")}
                label="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              sx={{ marginTop: "1rem", backgroundColor: "white" }}
              size="small"
            >
              <InputLabel required>Confirm Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps("confirmPassword")}
                label="Confirm Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <FormHelperText error>
                  {formik.errors.confirmPassword}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              size="small"
              sx={{ marginTop: "1rem", backgroundColor: "white" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    sx={{
                      width: "100%",
                    }}
                    disableFuture
                    label="DOB"
                    minDate={minDate}
                    onChange={(date) => {
                      formik.setFieldValue(
                        "dob",
                        dayjs(date).format("DD/MM/YYYY")
                      );
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {formik.touched.dob && formik.errors.dob ? (
                <FormHelperText error>{formik.errors.dob}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              sx={{ marginTop: "1rem", backgroundColor: "white" }}
              fullWidth
              size="small"
            >
              <InputLabel required>Gender</InputLabel>
              <Select label="Gender" {...formik.getFieldProps("gender")}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Prefer Not To Say</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender ? (
                <FormHelperText error>{formik.errors.gender}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              sx={{ marginTop: "1rem", backgroundColor: "white" }}
              fullWidth
              size="small"
            >
              <InputLabel required>Role</InputLabel>
              <Select label="Role" {...formik.getFieldProps("role")}>
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              ) : null}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px 0px, rgba(0, 0, 0, 0.09) 0px 4px 2px 0px, rgba(0, 0, 0, 0.09) 0px 8px 4px 0px, rgba(0, 0, 0, 0.09) 0px 16px 8px 0px, rgba(0, 0, 0, 0.09) 0px 32px 16px 0px",
              }}
            >
              Register
            </Button>

            <Link to="/login">
              <Typography
                variant="h6"
                sx={{
                  marginTop: "0.6rem",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Already Registered? Sign in
              </Typography>
            </Link>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
