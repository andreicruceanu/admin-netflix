import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import DeviderTitle from "./DeviderTitle";
import SiderBarStyled from "./SiderBarStyled";
import { mainMenu } from "../../../configs/menu.config";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ sidebarWidth, isCollapsed }) => {
  const [selected, setSelected] = useState("Dashboard");

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
