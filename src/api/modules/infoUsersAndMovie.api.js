import privateClient from "../client/private.client";

const authEndpoints = {
  info: "admin/info/users-movies",
  allUsers: "admin/info/users",
  allMovies: "admin/info/allMovies",
  getMovie: ({ mediaId }) => `admin/info/movie/${mediaId}`,
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
  getAllUsers: async () => {
    try {
      const response = await privateClient.get(authEndpoints.allUsers);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllMovies: async () => {
    try {
      const response = await privateClient.get(authEndpoints.allMovies);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getMovie: async ({ mediaId }) => {
    try {
      console.log({ mediaId });
      const response = await privateClient.get(
        authEndpoints.getMovie({ mediaId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default infoApi;
