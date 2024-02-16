import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerStyled = () => {
  return (
    <StyeldToastContainer
      position="top-center"
      autoClose={1500}
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
  "& .Toastify__toast--success": {
    background: "#039 !important",
    color: "white",
  },

  "& .Toastify__toast--error": {
    background: "#bd362f !important",
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
  "@media only screen and (max-width:480px)": {
    "& .Toastify__toast-container": {
      padding: "30px",
    },
    "& .Toastify__toast": {
      borderRadius: "5px",
      boxShadow: "0 0 12px #999",
      width: "300px !important",
      marginBottom: "10px",
      top: "15px",
      left: "80px",
    },
  },
}));

export default ToastContainerStyled;
