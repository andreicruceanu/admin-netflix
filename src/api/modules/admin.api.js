import privateClient from "../client/private.client";

const authEndpoints = {
  createAdmin: "admin/create",
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
};

export default adminApi;
