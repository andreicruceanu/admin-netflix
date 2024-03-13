import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import UsersIcons from "../assets/Dashboard/Users.svg";
import AdminsIcons from "../assets/Dashboard/Admins.svg";
import MoviesIcons from "../assets/Dashboard/Movies.svg";

export const convertOTPtoNumber = (otp) => {
  const concatenatedString = otp.join("");
  const otpNumber = parseInt(concatenatedString);
  return otpNumber;
};

export const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const showToast = (message, type) => {
  switch (type) {
    case "success":
      return toast.success(message, {
        icon: <CheckIcon sx={{ fontSize: "20px", fontWeight: 900 }} />,
      });
    case "error":
      return toast.error(message, {
        icon: <CancelIcon sx={{ fontSize: "24px", fontWeight: 900 }} />,
      });
    default:
      return null;
  }
};

export const iconsInfoDashboard = (state) => {
  switch (state) {
    case "users":
      return <img src={UsersIcons} alt="Icon Users" />;
    case "admins":
      return <img src={AdminsIcons} alt="Icon Admins" />;
    case "movies":
      return <img src={MoviesIcons} alt="Icon Movies" />;
    default:
      return null;
  }
};
