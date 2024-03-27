import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import TwoFA from "../pages/Login/TwoFA";
import ProtectedRouter from "../components/common/ProtectedRoute/ProtectedRoute";
import Dashborad from "../pages/Dashboard/Dashborad";
import MainLayout from "../components/layout/MainLayout";
import UsersApp from "../pages/usersApp/UsersApp";
import CreateAdmin from "../pages/createAdmin/CreateAdmin";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import CreateMovie from "../pages/createMovie/CreateMovie";
import Movies from "../pages/Movies/Movies";
import SettingUser from "../pages/SettingUser/SettingUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: "",
    children: [
      {
        path: "/login",
        index: true,
        element: <Login />,
      },
      {
        path: "/auth/two-factor",
        element: (
          <ProtectedRouter>
            <TwoFA />,
          </ProtectedRouter>
        ),
      },
      {
        path: "/auth/recover-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            element: (
              <ProtectedRouter>
                <Dashborad />
              </ProtectedRouter>
            ),
            index: true,
          },
          {
            path: "userApp",
            element: (
              <ProtectedRouter>
                <UsersApp />
              </ProtectedRouter>
            ),
          },
          {
            path: "create-admin",
            element: (
              <ProtectedRouter>
                <CreateAdmin />
              </ProtectedRouter>
            ),
          },
          {
            path: "create-movie",
            element: (
              <ProtectedRouter>
                <CreateMovie />
              </ProtectedRouter>
            ),
          },
          {
            path: "movies",
            element: (
              <ProtectedRouter>
                <Movies />,
              </ProtectedRouter>
            ),
          },
          {
            path: "setting",
            element: (
              <ProtectedRouter>
                <SettingUser />,
              </ProtectedRouter>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Login />,
  },
]);
