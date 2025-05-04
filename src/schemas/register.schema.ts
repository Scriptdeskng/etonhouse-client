import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
