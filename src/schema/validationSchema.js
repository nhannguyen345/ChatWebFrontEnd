import * as yup from "yup";

// Schema for Register form
export const registerSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "The maximum length of the password is 32 characters.")
    .required("Password is required"),
});

// Schema for Login form
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Schema for Reset Password form
export const resetPassSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const changePassSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "The maximum length of the password is 32 characters.")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match.")
    .required("Password is required"),
});
