import React from "react";

// MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const PhoneNumbersComponent = ({ formik }) => {
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
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
        </Box>
      </Box>
    </Container>
  );
};

export default PhoneNumbersComponent;
