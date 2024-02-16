import { Box, useTheme } from "@mui/material";
import React from "react";
import Sidebar from "../common/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../common/topbar/Topbar";
import useCloseSidebar from "../../hooks/useCloseSidebar";

const sidebarWidth = 270;

const MainLayout = () => {
  const { toggleCollapse, isCollapsed } = useCloseSidebar();
  const theme = useTheme();

  return (
    <Box display="flex">
      <Sidebar sidebarWidth={sidebarWidth} isCollapsed={isCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: `${theme.palette.background.default}`,
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        <Topbar toggleCollapse={toggleCollapse} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
