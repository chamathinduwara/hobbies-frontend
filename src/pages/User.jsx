import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes.js";
import { useRecoilValue } from "recoil";
import { isAuth } from "../store/atoms.js";

const Loading = () => {
  return <div>Loading...</div>;
};

const UserDetails = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useRecoilValue(isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate(ROUTES.SIGNIN);
    }
  }, []);
  useEffect(() => {
    (async function () {
      const user = await api.currentUser();
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
      //   setUserDetails(user);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        User Details
      </Typography>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <AccountBoxIcon style={{ fontSize: 50, marginRight: 10 }} />
        <Typography variant="h5">{currentUser.name}</Typography>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <EmailIcon style={{ fontSize: 30, marginRight: 10 }} />
        <Typography variant="subtitle1">{currentUser.email}</Typography>
      </div>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5" gutterBottom>
        Contacts
      </Typography>
      <List>
        {currentUser.contact_numbers.map((contact, index) => (
          <ListItem key={index}>
            <ContactPhoneIcon style={{ marginRight: 10 }} />
            <ListItemText primary={`${contact.type}: ${contact.number}`} />
          </ListItem>
        ))}
      </List>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5" gutterBottom>
        Hobbies
      </Typography>
      <List>
        {currentUser.hobbies.map((hobby, index) => (
          <ListItem key={index}>
            <SportsHandballIcon style={{ marginRight: 10 }} />
            <ListItemText primary={hobby} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDetails;