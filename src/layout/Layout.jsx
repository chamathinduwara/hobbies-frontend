import * as React from "react";

// MUI Imports
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

// Package Imports
import { Link } from "react-router-dom";

// Component Imports
import NavDrawer from "./NavDrawer.jsx";
import { ROUTES } from "../config/routes.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuth } from "../store/atoms.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/index.js";
import Cookies from "js-cookie";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function Layout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isAuthenticated = useRecoilValue(isAuth);
  const setIsAuth = useSetRecoilState(isAuth);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    setIsAuth(false);
    api.logout();
    Cookies.remove("accessToken");
    navigate(ROUTES.SIGNIN);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link
              to={ROUTES.ROOT}
              style={{ color: "white", textDecoration: "none" }}
            >
              HOBBY
            </Link>
          </Typography>
          {!isAuthenticated && (
            <Box>
              <Link
                to={ROUTES.SIGNIN}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white", marginLeft: "20px" }}
                >
                  Sign IN
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: "2px" }}
                >
                  <Typography color={"white"} variant="body1">
                    Register
                  </Typography>
                </Button>
              </Link>
            </Box>
          )}

          {isAuthenticated && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: "2px" }}
              onClick={handleSignOut}
            >
              <Typography color={"white"} variant="body1">
                Sign Out
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <NavDrawer toggle={toggleDrawer} isOpened={open} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            mt: "10vh",
            mb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
