export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const loginEnd = (twoFAUser) => ({
  type: "LOGIN_END",
  payload: twoFAUser,
});
export const loginFailure = (messageError) => ({
  type: "LOGIN_FAILURE",
  payload: messageError,
});
