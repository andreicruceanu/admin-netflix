import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

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
    name: "Contacts Information",
    path: "contacts",
    icon: <ContactsOutlinedIcon />,
    state: "contacts",
    isDevider: false,
  },
  {
    name: "Create",
    isDevider: true,
  },
  {
    name: "Create admin",
    path: "create-admin",
    icon: <ContactsOutlinedIcon />,
    state: "createAdmin",
    isDevider: false,
  },
  {
    name: "Create Movie",
    path: "create-movie",
    icon: <ContactsOutlinedIcon />,
    state: "createMovie",
    isDevider: false,
  },
];
