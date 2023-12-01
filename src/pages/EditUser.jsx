import React, { useState, useEffect } from "react";

// MUI Imports
import {
  Typography,
  TextField,
  List,
  ListItem,
  Button,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// Package Imports
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Local Imports
import { ROUTES } from "../config/routes.js";

// Recoil Imports
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuth } from "../store/atoms.js";

// API Imports
import api from "../api";

const Loading = () => {
  return <div>Loading...</div>;
};

const EditUser = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = useRecoilValue(isAuth);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate(ROUTES.SIGNIN);
    }
  }, []);

  useEffect(() => {
    (async function () {
      const user = await api.user(id);
      console.log(user);
      setUserDetails(user);
      setLoading(false);
    })();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...userDetails.contact_numbers];
    updatedContacts[index][field] = value;
    setUserDetails({ ...userDetails, contact_numbers: updatedContacts });
  };

  const handleAddContact = () => {
    const updatedContacts = [
      ...userDetails.contact_numbers,
      { type: "", number: "" },
    ];
    setUserDetails({ ...userDetails, contact_numbers: updatedContacts });
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = userDetails.contact_numbers.filter(
      (_, i) => i !== index
    );
    setUserDetails({ ...userDetails, contact_numbers: updatedContacts });
  };

  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...userDetails.hobbies];
    updatedHobbies[index] = value;
    setUserDetails({ ...userDetails, hobbies: updatedHobbies });
  };

  const handleAddHobby = () => {
    const updatedHobbies = [...userDetails.hobbies, ""];
    setUserDetails({ ...userDetails, hobbies: updatedHobbies });
  };

  const handleRemoveHobby = (index) => {
    const updatedHobbies = userDetails.hobbies.filter((_, i) => i !== index);
    setUserDetails({ ...userDetails, hobbies: updatedHobbies });
  };

  const handleSubmit = () => {
    console.log("Submitted:", userDetails);
    const response = api.updateUser(userDetails);
    console.log(response);
    navigate(ROUTES.ROOT);
  };

  const handleDelete = () => {
    console.log("Deleted:", userDetails.user_id);
    const response = api.deleteUser(userDetails.user_id);
    console.log(response);
    navigate(ROUTES.ROOT);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit User Details
      </Typography>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <AccountBoxIcon style={{ fontSize: 50, marginRight: 10 }} />
        <TextField
          name="name"
          value={userDetails.name}
          label="Name"
          onChange={handleInputChange}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <EmailIcon style={{ fontSize: 30, marginRight: 10 }} />
        <TextField
          name="email"
          value={userDetails.email}
          label="Email"
          onChange={handleInputChange}
          type="email"
        />
      </div>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5" gutterBottom>
        Edit Contacts
      </Typography>
      <List>
        {userDetails.contact_numbers.map((contact, index) => (
          <ListItem key={index}>
            <ContactPhoneIcon style={{ marginRight: 10 }} />
            <TextField
              value={contact.type}
              label="Contact Type"
              onChange={(e) =>
                handleContactChange(index, "type", e.target.value)
              }
            />
            <TextField
              value={contact.number}
              label="Contact Number"
              onChange={(e) =>
                handleContactChange(index, "number", e.target.value)
              }
            />
            <Button onClick={() => handleRemoveContact(index)}>Remove</Button>
          </ListItem>
        ))}
        <Button onClick={handleAddContact}>Add Contact</Button>
      </List>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="h5" gutterBottom>
        Edit Hobbies
      </Typography>
      <List>
        {userDetails.hobbies.map((hobby, index) => (
          <ListItem key={index}>
            <SportsHandballIcon style={{ marginRight: 10 }} />
            <TextField
              value={hobby}
              label="Hobby"
              onChange={(e) => handleHobbyChange(index, e.target.value)}
            />
            <Button onClick={() => handleRemoveHobby(index)}>Remove</Button>
          </ListItem>
        ))}
        <Button onClick={handleAddHobby}>Add Hobby</Button>
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginRight: "5px" }}
      >
        Edit
      </Button>
      <Button variant="contained" color="primary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default EditUser;
