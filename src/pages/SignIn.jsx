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
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// Local Imports
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Recoil Imports
import { useSetRecoilState } from "recoil";
import { isAuth } from "../store/atoms.js";

// API Imports
import { ROUTES } from "../config/routes.js";

// Component Imports
import register from "../api/register";

const SignIn = () => {
  const navigate = useNavigate();
  const setIsAuth = useSetRecoilState(isAuth);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await register.login(values);
        const { accessToken } = response;
        Cookies.remove("accessToken");
        Cookies.set("accessToken", accessToken);
        Cookies.get("accessToken") && setIsAuth(true);
        navigate(ROUTES.ROOT);
      } catch (error) {
        console.error("Login Error", error);
      }
    },
  });

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="name"
                label="name"
                type="string"
                id="name"
                autoComplete="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={formik.handleSubmit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  Don,t have an account? Sign Up
                </Typography>
              </Link>
              <Typography variant="body2">
                sample username:- Chamath, email:-chamath@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
