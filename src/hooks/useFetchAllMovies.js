import { useEffect, useState } from "react";
import infoApi from "../api/modules/infoUsersAndMovie.api";

export function useFetchAllMovies() {
  const [movies, setAllMovies] = useState([]);
  const [error, setError] = useState(null);
  const [onRequest, setOnRequrest] = useState(false);

  async function loadMovies() {
    setOnRequrest(true);
    const { response, err } = await infoApi.getAllMovies();
    setOnRequrest(false);
    if (response) {
      setAllMovies(response);
    }
    if (err) {
      setError(err);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return { movies, error, onRequest };
}
