import privateClient from "../client/private.client";

const authEndpoints = {
  createAdmin: "admin/create",
  deleteUser: (userId) => `admin/deleteUser/${userId}`,
  updateUser: (userId) => `admin/updateProfile/${userId}`,
  changePassword: "admin/changePassword",
  updateAdmin: "admin/updateAdmin",
};

const adminApi = {
  createAdmin: async ({
    lastName,
    firstName,
    username,
    email,
    password,
    role,
  }) => {
    try {
      const response = await privateClient.post(authEndpoints.createAdmin, {
        lastName,
        firstName,
        username,
        email,
        password,
        role,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await privateClient.delete(
        authEndpoints.deleteUser(userId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateUser: async ({ userId, email, firstName, lastName }) => {
    try {
      const response = await privateClient.patch(
        authEndpoints.updateUser(userId),
        {
          email,
          firstName,
          lastName,
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changePassword: async ({ newPassword }) => {
    try {
      const response = await privateClient.post(authEndpoints.changePassword, {
        newPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateAdmin: async ({ firstName, lastName }) => {
    try {
      const response = await privateClient.patch(authEndpoints.updateAdmin, {
        firstName,
        lastName,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default adminApi;
