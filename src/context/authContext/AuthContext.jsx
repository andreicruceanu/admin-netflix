import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("jwt_token");
const email = localStorage.getItem("email");

const INITIAL_STATE = {
  user: user || null,
  twoFAUser: null,
  token: token || null,
  email: email || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("email", state.email);
  }, [state.user, state.token, state.email]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        twoFAUser: state.twoFAUser,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
