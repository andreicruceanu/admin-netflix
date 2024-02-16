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
            element: <Dashborad />,
            index: true,
          },
          {
            path: "userApp",
            element: <UsersApp />,
          },
          {
            path: "create-admin",
            element: <CreateAdmin />,
          },
        ],
      },
    ],
  },
]);
