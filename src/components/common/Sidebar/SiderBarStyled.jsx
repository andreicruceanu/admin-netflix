import { Box } from "@mui/material";

const SiderBarStyled = ({ children }) => {
  return (
    <Box
      id="Sidebar"
      sx={{
        "& .sidebar-bg-color": {
          background: "#fff !important",
        },
        "& .pro-sidebar-inner": {
          background: "#fff !important",
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
          color: "#fff !important",
        },
        "& .pro-menu-item.active": {
          backgroundColor: "#4880FF !important",
          position: "relative",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        },
        "& .pro-menu-item:not(.active):hover": {
          backgroundColor: "#4880FF !important",
        },
        "& .pro-menu-item.active > .pro-inner-item": {
          color: "#fff !important",
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
          backgroundColor: "#4880FF !important",
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
          backgroundColor: "#4880FF !important",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SiderBarStyled;
