import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import "../src/components/styles/variables.css";
import "react-toastify/dist/ReactToastify.css";
import ToastContainerStyled from "./components/common/toast/ToastContainerStyled";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainerStyled />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
