import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { CreateMovieContextProvider } from "./context/createMovieContext/CreateMovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <CreateMovieContextProvider>
      <App />
    </CreateMovieContextProvider>
  </AuthContextProvider>
);
