import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { mainMenu } from "../../../configs/menu.config";
import { logout } from "../../../context/authContext/AuthActions";
import { CreateMovieContext } from "../../../context/createMovieContext/CreateMovieContext";
import { logoutForMovie } from "../../../context/createMovieContext/CreateMovieAction";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import Logo from "../../../assets/images/logo.png";
import DeviderTitle from "./DeviderTitle";
import SiderBarStyled from "./SiderBarStyled";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  authDispatch,
  movieDispatch,
}) => {
  function handleLogout() {
    authDispatch(logout());
    movieDispatch(logoutForMovie());
  }

  return (
    <MenuItem
      active={selected === title}
      onClick={
        title.toLowerCase() !== "logout"
          ? () => setSelected(title)
          : () => handleLogout()
      }
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ sidebarWidth, isCollapsed }) => {
  const [selected, setSelected] = useState("Dashboard");
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: movieDispatch } = useContext(CreateMovieContext);
  return (
    <SiderBarStyled>
      <ProSidebar width={sidebarWidth} collapsed={isCollapsed}>
        <Menu iconShape="square">
          <Box
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "red",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 6 }}
              >
                <img src={Logo} width="160px" alt="Logo" />
              </Box>
            )}
          </Box>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {mainMenu.map((item, index) =>
              item?.isDevider ? (
                <DeviderTitle key={index} title={item.name} />
              ) : (
                <Item
                  key={index}
                  title={item.name}
                  to={item.path}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                  authDispatch={authDispatch}
                  movieDispatch={movieDispatch}
                />
              )
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </SiderBarStyled>
  );
};

export default Sidebar;
