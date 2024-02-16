import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerStyled = () => {
  return (
    <StyeldToastContainer
      position="top-center"
      autoClose={500000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
  );
};

const StyeldToastContainer = styled(ToastContainer)(({}) => ({
  "& .Toastify__toast-theme--light": {
    background: "#039",
    color: "white",
  },
  "& .Toastify__toast--success > .Toastify__toast-body > .Toastify__toast-icon":
    {
      border: "1px solid white",
      paddingRight: "20px",
    },
  "& .Toastify__toast": {
    minHeight: "47px !important",
    boxShadow: "0 0 12px #999",
  },
  "& .Toastify__toast:hover": {
    boxShadow: "0 0 12px #000",
  },
}));

export default ToastContainerStyled;
