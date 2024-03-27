import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ReactComponent as Notification } from "../../../assets/images/notification.svg";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import Flag from "../../../assets/images/UKFlag.png";

export default function Topbar({ toggleCollapse }) {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#fff !important",
          boxShadow: "none !important",
          color: "black",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "15px 0",
          }}
        >
          <Box display="flex">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, "& svg ": "grey" }}
              onClick={toggleCollapse}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                backgroundColor: "#F5F6FA",
                borderRadius: "14px",
                gap: "8px",
                p: "0.1rem 1rem",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                minWidth: "400px",
              }}
            >
              <Search sx={{ color: "#8a8a8a", fontSize: "22px" }} />
              <InputBase placeholder="Search..." />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Notification />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              ml={2}
            >
              <img src={Flag} alt="Flag" width="35px" />
              <Typography variant="caption">English</Typography>
            </Box>
            {user && (
              <Box display="flex" alignItems="center" gap={1} ml={2}>
                <Avatar />
                <Box display="flex" flexDirection="column">
                  <Typography variant="body">
                    {user?.lastName + " " + user?.firstName}
                  </Typography>
                  <Typography variant="caption">{user.role}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
