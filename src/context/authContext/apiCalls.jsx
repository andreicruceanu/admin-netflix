import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "https://netflix-vercel-api.vercel.app/api/v1/admin/login",
      user
    );
    console.log(response);
  } catch (error) {
    dispatch(
      loginFailure(
        error.response.data.message
          ? error.response.data.message
          : "Something  not working"
      )
    );
  }
};
