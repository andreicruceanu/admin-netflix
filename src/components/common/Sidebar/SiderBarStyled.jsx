import { Box, useTheme } from "@mui/material";
import React from "react";

const SiderBarStyled = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      id="Sidebar"
      sx={{
        "& .sidebar-bg-color": {
          background: `${theme.palette.primary.light} !important`,
        },
        "& .pro-sidebar-inner": {
          background: `${theme.palette.primary.light} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item": {
          width: "90%",
          borderRadius: "5px",
          position: "relative",
        },
        "& .pro-inner-item": {
          padding: "15px !important",
          position: "relative",
          color: "black",
        },
        "& .pro-inner-item.active": {
          padding: "5px 35px 5px 20px !important",
        },

        "& .pro-inner-item:hover": {
          color: `${theme.palette.primary.dark} !important`,
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${theme.palette.primary.main}`,
          position: "relative",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        },
        "& .pro-menu-item:not(.active):hover": {
          backgroundColor: `${theme.palette.primary.btnBgHover}`,
        },
        "& .pro-menu-item.active > .pro-inner-item": {
          color: `${theme.palette.primary.light} !important`,
        },
        "& .pro-menu-item.active::after": {
          content: '""',
          position: "absolute",
          width: "5px",
          height: "100%",
          top: 0,
          left: "-27px",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          backgroundColor: `${theme.palette.primary.main}`,
        },
        "& .pro-menu-item:not(.active):hover::after": {
          content: '""',
          position: "absolute",
          width: "5px",
          height: "100%",
          top: 0,
          left: "-27px",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          backgroundColor: `${theme.palette.secondary.main}`,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SiderBarStyled;
