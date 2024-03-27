import { useEffect, useState } from "react";
import { showToast } from "../utils/functions";
import apiCreateMovie from "../api/modules/createMovie";

export function useMovieStatusAndGenres() {
  const [movieStatus, setMovieStatus] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);

  async function loadMovieStatusAndGenres() {
    const { response, err } = await apiCreateMovie.getInfo();
    if (response) {
      setMovieStatus(response.statusMovie);
      setMovieGenres(response.genresMovie);
    }
    if (err) {
      showToast(err.message, "error");
    }
  }

  useEffect(() => {
    loadMovieStatusAndGenres();
  }, []);

  return { movieStatus, movieGenres };
}
