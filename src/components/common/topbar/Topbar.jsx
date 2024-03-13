import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
export default function Topbar({ toggleCollapse }) {
  const name = localStorage.getItem("firstName") || "Andrei";

  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  //
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
        <Toolbar sx={{ p: "15px 0" }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome , ${name}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
