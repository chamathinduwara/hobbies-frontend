import React from "react";

// MUI Imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Package Imports
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// Local Imports
import { ROUTES } from "../config/routes.js";

// Component Imports
import HobbiesComponent from "../components/HobbiesComponent.jsx";

// API Imports
import register from "../api/register";

const SignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      home: "",
      personal: "",
      hobbies: [],
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await register.register(values);
        console.log(response);
        navigate(ROUTES.SIGNIN);
      } catch (error) {
        console.error("Login Error", error);
      }
    },
  });
  return (
    <Container component={"main"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="name"
                label="User Name"
                type="string"
                id="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="home"
                label="Home Number"
                type="string"
                id="home"
                autoComplete="number"
                onChange={formik.handleChange}
                value={formik.values.home}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="personal"
                label="Personal Number"
                name="personal"
                autoComplete="personal"
                onChange={formik.handleChange}
                value={formik.values.personal}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <HobbiesComponent formik={formik} />
          {/* <PhoneNumbersComponent formik={formik} /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "30%" }}
              onClick={formik.handleSubmit}
            >
              Sign Up
            </Button>
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.SIGNIN}>
                <Typography variant="body2" sx={{}}>
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
