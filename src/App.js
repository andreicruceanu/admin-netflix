import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./routers";
import "../src/components/styles/variables.css";
import ToastContainerStyled from "./components/common/toast/ToastContainerStyled";
// import { ColorModeContext, useMode } from "./theme";
function App() {
  // const [theme, colorMode] = useMode();
  return (
    <>
      {/* <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <ToastContainerStyled />
      <RouterProvider router={router} />
      {/* </ThemeProvider>
      </ColorModeContext.Provider> */}
    </>
  );
}

export default App;
