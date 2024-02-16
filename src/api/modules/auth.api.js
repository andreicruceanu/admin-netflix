import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const authEndpoints = {
  login: "admin/login",
  sendEmail2FA: ({ email }) => `/admin/2FAmail/${email}`,
  verifyCode2FA: ({ code }) => `/admin/2FAverify/${code}`,
  recoverPassword: "/admin/resetPassword",
  resetPassword: "/admin/confirmResetPassword",
};

const authApi = {
  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(authEndpoints.login, {
        username,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  sendEmail2FA: async ({ email }) => {
    try {
      const response = await privateClient.post(
        authEndpoints.sendEmail2FA({ email })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  verifyCode2FA: async ({ code }) => {
    try {
      const response = await privateClient.post(
        authEndpoints.verifyCode2FA({ code })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  recoverPassword: async ({ email }) => {
    try {
      const response = await publicClient.post(authEndpoints.recoverPassword, {
        email,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  resetPassword: async ({ token, newPassword }) => {
    try {
      const response = await publicClient.post(authEndpoints.resetPassword, {
        token,
        newPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default authApi;
