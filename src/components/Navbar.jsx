
import { Link } from "react-router-dom"; 
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");

    if (userData && token) {
      const { role } = userData;

      if (role === "farmer") {
       navigate("/farmerhome");
      } else if (role === "manager") {
        navigate("/manager-home");
      }
    }
  }, []); 
  const handleLoginClick = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");

    if (userData && token) {
      const { role } = userData;

      if (role === "farmer") {
       navigate("/farmerhome");
      } else if (role === "manager") {
       navigate("/manager-home");
      }
    } else {
      navigate("/login"); // Redirect to /login page if user data and token are not available
    }
  };
  const menuItems = [
    { text: "About Us", icon: <InfoIcon />, link: "/about" },
    { text: "Register", icon: <AccountCircleIcon />, link: "/register" },
    { text: "Login", icon: <AccountCircleIcon />, link: "/login" },
  ];

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >

            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <Link to="/"><img src='ourlogo.png' alt="Logo" style={{ height: 70, marginRight: 10 }} /> </Link> 
            <Typography variant="subtitle1" component="div" style={{ display: "flex", flexDirection: "column" }}>
              ColdStore
            </Typography>
          </Typography>
          

          <Button component={Link} to="/about" color="inherit" startIcon={<InfoIcon />} sx={{ display: { xs: "none", sm: "block" } }}>
            About Us
          </Button>
          <Button component={Link} to="/register" color="inherit" startIcon={<AccountCircleIcon />} sx={{ display: { xs: "none", sm: "block" } }}>
            Register
          </Button>
          <Button component={Link} to="/login" onClick={handleLoginClick} color="inherit" startIcon={<AccountCircleIcon />} sx={{ display: { xs: "none", sm: "block" } }}>
        Login
      </Button>
        
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={item.text} component={Link} to={item.link}>
                {item.icon}
                <Typography variant="body1" sx={{ ml: 2 }}>
                  {item.text}
                </Typography>
              </ListItem>
            ))}
            <Divider />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
