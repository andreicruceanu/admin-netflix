import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext/AuthContext";

export default function ProtectedRouter({ children }) {
  const { user, twoFAUser } = useContext(AuthContext);

  return user || twoFAUser ? children : <Navigate to="/login" replace />;
}
