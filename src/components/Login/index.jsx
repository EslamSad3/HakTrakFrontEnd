import React, { useContext } from "react";
import { Context } from "../../context";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
  FormControl,
} from "@mui/material";
import FlexBetween from "../FlexBetween";

// Login component for handling user login
function Login() {
  const { handleLogingIn, isLoading } = useContext(Context);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Incorrect Email Format")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  // Form submission handler
  const handleLogin = async (values) => {
    await handleLogingIn(values);
  };

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FlexBetween>
            <FormControl></FormControl>
            <Button
              disabled={!(formik.isValid && formik.dirty) || isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ m: "1rem", px: "2rem" }}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#fafafa" }} />
              ) : (
                "Sign in"
              )}
            </Button>
          </FlexBetween>
        </Box>
      </form>
    </Container>
  );
}

export default Login;
