import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

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
    case "succes":
      return toast.success(message, {
        icon: <CheckIcon sx={{ fontSize: "20px", fontWeight: 900 }} />,
      });
    case "error":
      return <CheckIcon sx={{ fontSize: "20px", fontWeight: 900 }} />;
    default:
      console.log("Tipul de notificare nu este valid");
      return null;
  }
};
