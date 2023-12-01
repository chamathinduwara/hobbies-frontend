import React from "react";

// MUI Imports
import { Box, Grid, Modal, Fade } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// React Imports
import { useEffect, useState } from "react";

// Package Imports
import { useNavigate } from "react-router-dom";

// Local Imports
import { ROUTES } from "../config/routes";

// Recoil Imports
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuth, ATOM_ME } from "../store/atoms";

// API Imports
import api from "../api";

const Home = () => {
  const setMe = useSetRecoilState(ATOM_ME);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const isAuthenticated = useRecoilValue(isAuth);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate(ROUTES.SIGNIN);
    }
    else{
      (async function () {
        const users = await api.users();
        const me = await api.currentUser();
        setMe(me);
        console.log(me);
        setUsers(users);
      })();
    }
  }, []);


  const handleOpen = (index) => {
    console.log(index);
    setselectedUser(users[index]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => {
    console.log(index);
    navigate(ROUTES.EDIT.replace(":id", index));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredUsers.map((user, index) => (
          <Grid key={index} item xs={4} minWidth="300px">
            <Card
              sx={{
                minWidth: 275,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "5px",
              }}
            >
              <CardContent>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="p">{user.email}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h5" component="div">
                  Hobbies
                </Typography>
                {user.hobbies && user.hobbies != "" ? (
                  <Typography variant="body2">{user.hobbies[0]}</Typography>
                ) : (
                  <Typography variant="body2">No hobbies</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpen(index)}
                >
                  Expand
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  type="link"
                  onClick={() => handleEdit(user.user_id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              boxShadow: 24,
              p: 4,
              minWidth: 300,
              maxWidth: 400,
            }}
          >
            {selectedUser && (
              <>
                <Typography variant="h5">{selectedUser.name}</Typography>
                <Typography variant="p">{selectedUser.email}</Typography>
                <Box variant="div">
                  <Typography variant="h5" component="div">
                    Contacts
                  </Typography>
                  {selectedUser.contact_numbers &&
                  selectedUser.contact_numbers != "" ? (
                    <Box variant="div">
                      {selectedUser.contact_numbers.map(
                        (contactNumber, index) => (
                          <Box
                            variant="div"
                            key={index}
                            sx={{ display: "flex" }}
                          >
                            <Typography variant="body2">
                              {contactNumber.type} :- &nbsp;
                            </Typography>
                            <Typography variant="body2">
                              {contactNumber.number}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2">No Contact Number</Typography>
                  )}
                </Box>
                <Box variant="div">
                  <Typography variant="h5" component="div">
                    Hobbies
                  </Typography>
                  {selectedUser.hobbies && selectedUser.hobbies != "" ? (
                    <Box variant="div">
                      {selectedUser.hobbies.map((hobby, index) => (
                        <Typography key={index} variant="body2">
                          {hobby}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2">No hobbies</Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;
