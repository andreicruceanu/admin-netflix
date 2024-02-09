import Topbar from "./components/topbar/Topbar";
import { CssBaseline, GlobalStyles } from "@mui/material";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { router } from "./routers";
import TwoFA from "./pages/Login/TwoFA";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/two-factor" element={<TwoFA />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
