import privateClient from "../client/private.client";

const authEndpoints = {
  info: "admin/info/users-movies",
};

const infoApi = {
  getInfo: async () => {
    try {
      const response = await privateClient.get(authEndpoints.info);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default infoApi;
