import { Form } from "react-hook-form";
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
  uploadImages: async ({ poster, backdrop }) => {
    try {
      const formData = new FormData();
      formData.append("poster", poster);
      formData.append("backdrop", backdrop);

      const response = await privateClient.put(
        createMovieEndpoints.uploadImages,
        formData
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default apiCreateMovie;
