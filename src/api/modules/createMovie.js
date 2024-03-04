import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const createMovieEndpoints = {
  getInfo: "/admin/createMovie/info",
  primaryFacts: "/admin/createMovie",
  uploadImages: "/admin/createMovie/uploadImages",
  deleteMovies: (movieId) => `/admin/createmovie/${movieId}`,
};

const apiCreateMovie = {
  getInfo: async () => {
    try {
      const response = await publicClient.get(createMovieEndpoints.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createMoviePrimary: async ({ ...data }) => {
    try {
      const response = await privateClient.post(
        createMovieEndpoints.primaryFacts,
        { ...data }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteMovie: async ({ mediaId }) => {
    try {
      const response = await privateClient.delete(
        createMovieEndpoints.deleteMovies(mediaId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  uploadImages: async ({ poster, backdrop, mediaId }) => {
    try {
      console.log(poster[0], backdrop[0]);
      const formData = new FormData();
      formData.append("poster", poster[0]);
      formData.append("backdrop", backdrop[0]);
      formData.append("mediaId", mediaId);

      const response = await privateClient.put(
        createMovieEndpoints.uploadImages,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default apiCreateMovie;
