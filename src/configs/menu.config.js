import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
export const mainMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeOutlinedIcon />,
    state: "dashboard",
    isDevider: false,
  },
  {
    name: "User",
    isDevider: true,
  },
  {
    name: "Users App",
    path: "userApp",
    icon: <PeopleOutlinedIcon />,
    state: "manager",
    isDevider: false,
  },

  {
    name: "Create",
    isDevider: true,
  },
  {
    name: "Create admin",
    path: "create-admin",
    icon: <PersonAddAltIcon />,
    state: "createAdmin",
    isDevider: false,
  },
  {
    name: "Create Movie",
    path: "create-movie",
    icon: <AddToQueueIcon />,
    state: "createMovie",
    isDevider: false,
  },
  {
    name: "Movies",
    path: "movies",
    icon: <LiveTvIcon />,
    state: "movies",
    isDevider: false,
  },
  {
    name: "",
    isDevider: true,
  },
  {
    name: "Setting",
    path: "setting",
    icon: <SettingsIcon />,
    state: "setting",
    isDevider: false,
  },
  {
    name: "Logout",
    path: "",
    icon: <LogoutIcon />,
    state: "logout",
    isDevider: false,
  },
];
