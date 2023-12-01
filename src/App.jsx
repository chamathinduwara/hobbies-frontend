import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./config/theme.js";
import Layout from "./layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import { ROUTES } from "./config/routes.js";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isAuth, ATOM_ME } from "./store/atoms.js";
import * as React from "react";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";
import EditUser from "./pages/EditUser.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function App() {
  const setMe = useSetRecoilState(ATOM_ME);
  const isAuthenticated = useRecoilValue(isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.SIGNIN);
    } else {
      (async function () {
        const user = await api.currentUser();
        setMe(user);
        console.log(user);
      })();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path={ROUTES.SIGNIN} element={<SignIn />} />
          <Route path={ROUTES.REGISTER} element={<SignUp />} />
          <Route path={ROUTES.ROOT} element={<Home />} />
          <Route path={ROUTES.CREATE} element={<CreateUser />} />
          <Route path={ROUTES.USER} element={<User />} />
          <Route path={ROUTES.EDIT} element={<EditUser />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
