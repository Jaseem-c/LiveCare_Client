import React, { useState } from "react";
import "./Bookings.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import List from "./List";
import { Container } from "@mui/material";

function Bookings() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    color: "#E6CCB2",
    marginLeft: 0,
    width: "10%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "80%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "70%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container>
      <div className="m- 3 p-4" style={{ width: "100%" }}>
        <h1 className="text-center book1">Booking List</h1>
        <Box sx={{ flexGrow: 1 }} className="m-5">
          <AppBar position="static" sx={{ backgroundColor: "#9C6644" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 1 }}
              ></IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  color: "beige",
                }}
              >
                Search Bookings
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                
                <StyledInputBase
  placeholder="Search…"
  value={searchQuery}
  onChange={handleSearchChange}
  inputProps={{ "aria-label": "search" }}
  color="beige"
  autoFocus 
/>
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <List search={searchQuery}></List>
      </div>
    </Container>
  );
}

export default Bookings;
