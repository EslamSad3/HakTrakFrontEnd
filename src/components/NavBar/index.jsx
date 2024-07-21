import React, { useContext, useEffect, useState } from "react";
import { ArrowDropDownOutlined, Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import profileImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Context } from "../../context";

function NavBar({ isSidebarOpen, setIsSidebarOpen }) {
  const { adminToken, userToken } = useContext(Context);

  const [adminData, setAdminData] = useState({});
  const [userTokenData, setUserTokenData] = useState({});


  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    localStorage.clear();
    navigate("/login");
    setAnchorEl(null);
  };

  useEffect(() => {
    const dataDecoded = () => {
      if (adminToken) {
        setAdminData(jwtDecode(adminToken));
      }
      if (userToken) {
        setUserTokenData(jwtDecode(userToken));
      }
    };
    dataDecoded();
  }, [adminToken, userToken]);

  return (
    <AppBar
      sx={{
        position: "static",
        background: `${theme.palette.background.alt}`,
        boxShadow: " 1px 1px 1px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* Right */}
        <FlexBetween gap="1.5rem">
          <FlexBetween
            sx={{
              " .MuiOutlinedInput-notchedOutline": { border: "0px" },
              border: "1px ",
            }}
          ></FlexBetween>

          <FlexBetween>
            <Typography variant="body1" color="white">
              {adminToken
                ? `Welcome ${adminData?.payload?.name}`
                : `Welcome ${userTokenData?.payload?.name}`}
            </Typography>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={() => setAnchorEl(null)}
              // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => handleClose()}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
