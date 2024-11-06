import React, { useEffect, useState } from "react";
import {
  Container,
  InputBase,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import { Search as SearchIcon, Send as SendIcon } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import "./AdminChat.css";

function AdminChat() {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null); // State for filtered users
  const [singleMessage, setSingleMessage] = useState(null);
  const [sendMessage, setSendMessage] = useState({
    senderId: "65e16d424097856f1bda4503",
    senderName: "Admin",
    receiverId: "",
    message: "",
  });
  const [userDetails, setUserDetails] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    filterUsers(event.target.value); // Filter users on message change
  };

  const filterUsers = (searchTerm) => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.senderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleSendMessage = () => {
    console.log("Sending message:", message);

    setMessage("");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`${baseurl}/complaints/chats`);
      console.log(result.data);
      setUsers(result.data.uniqueSenders);
      setFilteredUsers(result.data.uniqueSenders); // Initialize filtered users with all users
    } catch (error) {
      console.log(error);
    }
  };

  const MessageSingleUser = async (item) => {
    try {
      const result = await axios.get(
        `${baseurl}/getMessages/${item?._id}/65e16d424097856f1bda4503`
      );
      console.log(result.data);
      setSingleMessage(result.data);
      setSelectedUser(capitalizeFirstLetter(item?.senderName));
      setUserDetails(item);
      setSendMessage({
        ...sendMessage,
        receiverId: item?._id,
        name: item?.senderName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (item) => {
    try {
      const result = await axios.get(
        `${baseurl}/getMessages/${item?.receiverId}/65e16d424097856f1bda4503`
      );
      console.log(result.data);
      setSingleMessage(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSentMessage = async () => {
    try {
      const result = await axios.post(`${baseurl}/user/sendchat`, sendMessage, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlkIjoiNjVlMTZkNDI0MDk3ODU2ZjFiZGE0NTAzIiwiaWF0IjoxNzE0MzgxMjU3fQ.YiBUMYg5P0Ryle0aSaS5sf7psy2jcj6UXyeZ2ZI36Ew",
        },
      });
      if (result.status >= 200 && result.status <= 300) {
        console.log(result.data);
        getMessages(sendMessage);
        setSendMessage({
          ...sendMessage,
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF9F6",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <h3 className="ms-5 mt-2">Chat</h3>
      <Container className="mt-5 " style={{ backgroundColor: "white" }}>
        <Row>
          <Col lg={4} style={{ borderRight: "15px solid #FAF9F6 " }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search…"
                sx={{ flex: 1, bgcolor: "background.paper", padding: "10px" }}
                onChange={handleMessageChange}
              />
            </div>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {filteredUsers ? (
                filteredUsers.map((i) => (
                  <>
                    <ListItem
                      alignItems="flex-start"
                      button
                      onClick={() => MessageSingleUser(i)}
                    >
                      <ListItemText
                        primary={capitalizeFirstLetter(i?.senderName)}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </>
                ))
              ) : (
                <Typography>No Users Available</Typography>
              )}
            </List>
          </Col>

          <Col lg={8} style={{ position: "relative" }}>
            <h4 className="ms-3 mt-2">{selectedUser || "Select a user"}</h4>
            <Divider component="li" />

            <div className="chat_body poppins-regular ">
              {/* Render chat messages based on selectedUser */}
              {singleMessage &&
                singleMessage.map((i) => (
                  <React.Fragment>
                    {i?.senderId === "65e16d424097856f1bda4503" ? (
                      <div className="user_chat1">
                        <p>{i.message}</p>
                      </div>
                    ) : (
                      <>
                        <div className="admin_chat1">
                          <p>{i?.message}</p>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
            </div>

            <div
              className="chat_input"
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "#fff",
                padding: "4px",
              }}
            >
              <input
                className="form-control"
                type="text"
                placeholder="Type your message..."
                value={sendMessage.message}
                onChange={(e) =>
                  setSendMessage({ ...sendMessage, message: e.target.value })
                }
                style={{ flex: 1, padding: "10px", marginRight: "10px" }}
              />
              <IconButton aria-label="send" onClick={handleSentMessage}>
                <SendIcon />
              </IconButton>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminChat;
