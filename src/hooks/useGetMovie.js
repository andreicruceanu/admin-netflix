import { useEffect, useState } from "react";
import infoApi from "../api/modules/infoUsersAndMovie.api";

export function useGetMovie(mediaId) {
  const [movie, getMovie] = useState(undefined);
  const [error, setError] = useState(null);

  async function loadMovie() {
    const { response, err } = await infoApi.getMovie({ mediaId });
    if (response) {
      getMovie(response.data);
    }
    if (err) {
      setError(err);
    }
  }

  useEffect(() => {
    loadMovie();
  }, [mediaId]);

  return { movie, error };
}
