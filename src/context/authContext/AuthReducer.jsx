const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        email: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SAVE_TOKEN":
      return {
        user: null,
        twoFAUser: action.payload,
        token: action.payload.token,
        email: action.payload.email,
        isFetching: false,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        token: action.payload.token,
        email: action.payload.email,
        isFetching: false,
        error: false,
      };
    case "LOGIN_END":
      return {
        isFetching: false,
        twoFAUser: action.payload,
        error: false,
        user: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        twoFAUser: null,
        token: null,
        email: null,
        isFetching: false,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default AuthReducer;
