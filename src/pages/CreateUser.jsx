import React from "react";
import { useEffect } from "react";

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
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// Local Imports
import { ROUTES } from "../config/routes.js";

// Component Imports
import HobbiesComponent from "../components/HobbiesComponent.jsx";

// Recoil Imports
import { useRecoilValue } from "recoil";
import { isAuth } from "../store/atoms.js";

// API Imports
import register from "../api/register";

const CreateUser = () => {
  const isAuthenticated = useRecoilValue(isAuth);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate(ROUTES.SIGNIN);
    }
  }, []);

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
          Create User
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
              sx={{ mt: 3, mb: 2, width: "50%" }}
              onClick={formik.handleSubmit}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUser;
