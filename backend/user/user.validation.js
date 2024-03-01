import Yup from "yup";
export let userValidationSchema = Yup.object({
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
  dob: Yup.date().nullable(),
  gender: Yup.string().nullable().trim().oneOf(["male", "female", "other"]),
  role: Yup.string()
    .required("role is required.")
    .trim()
    .oneOf(["buyer", "seller"]),
});

export let loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required.").trim(),
});
