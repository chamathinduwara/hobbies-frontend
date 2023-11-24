import React, { useState } from "react";
import { Box, Grid, Modal, Backdrop, Fade } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import api from "../api";
import { ROUTES } from "../config/routes";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuth } from "../store/atoms";
import TextField from "@mui/material/TextField";

const Home = () => {
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
  }, []);

  useEffect(() => {
    (async function () {
      const users = await api.users();
      console.log(users);
      setUsers(users);
    })();
  }, []);
  // Sample data for 15 cards

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
          <Grid key={index} item xs={4}>
            <Card
              sx={{
                minWidth: 275,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                {/* You can add more details here */}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;