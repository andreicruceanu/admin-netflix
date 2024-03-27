import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar/Sidebar";
import Topbar from "../common/topbar/Topbar";
import useCloseSidebar from "../../hooks/useCloseSidebar";

const sidebarWidth = 270;

const MainLayout = () => {
  const { toggleCollapse, isCollapsed } = useCloseSidebar();

  return (
    <Box display="flex">
      <Sidebar sidebarWidth={sidebarWidth} isCollapsed={isCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#F5F6FA",
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
